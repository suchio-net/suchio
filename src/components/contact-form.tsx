import { serviceStyles } from "@/components/service-styles";

import {
  ArrowRight,
  ArrowUpRight,
  CircleHelp,
  LoaderCircle,
  AppWindow,
  Monitor,
  RadioTower,
  Search,
  Workflow,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode, type SubmitEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import type { ServiceId } from "@/i18n/services";
import { useContactDraft, type ContactDraft } from "@/components/contact-draft";
import { emailPattern, isHttpUrl, retryAfterSeconds } from "@/lib/contact-validation";
import { useHydrated } from "@/components/use-hydrated";

type FieldName = "name" | "email" | "companyUrl" | "service" | "budget" | "message";
type Errors = Partial<Record<FieldName | "form", string>>;
type Status = "idle" | "sending" | "confirming" | "success";

type ServiceOption = { id: ServiceId; name: string };
type ServiceChoiceId = ServiceId | "not-sure";
type DraftFields = Omit<ContactDraft, "submission">;

export type ContactFormCopy = {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  company: string;
  companyPlaceholder: string;
  companyUrl: string;
  companyUrlPlaceholder: string;
  companyOptional: string;
  service: string;
  selectedService: string;
  serviceUnsure: string;
  budget: string;
  budgetPlaceholder: string;
  message: string;
  placeholder: string;
  submit: string;
  sending: string;
  required: string;
  emailError: string;
  companyUrlError: string;
  messageError: string;
  note: string;
  error: string;
  successTitle: string;
  successCopy: string;
  another: string;
  next: string;
  back: string;
  skip: string;
  step: string;
  detailsTitle: string;
  contactTitle: string;
};

const stepCount = 4;
const [serviceStep, messageStep, detailsStep, contactStep] = [0, 1, 2, 3];
const easeOut = [0.16, 1, 0.3, 1] as const;

// The visitor sees the tapped option as selected before the next step appears.
const autoAdvanceDelay = 200;
// A double click or a held Enter key must not also press the next step's button.
const stepChangeGuard = 350;
// The spinner stays long enough to read as a state, also when the response is instant.
const minimumSendingTime = 650;
const checkDrawTime = 700;

const fieldControlClass =
  "min-w-0 w-full rounded-control border-0 bg-surface-subtle px-4 text-ink shadow-surface transition-[background-color,box-shadow,scale] duration-150 ease-[var(--ease-out)] placeholder:text-subtle hover:bg-white hover:shadow-surface-hover focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-invalid:outline-2 aria-invalid:outline-error motion-reduce:transition-none";
const stepHeadingClass = "m-0 text-heading-md text-ink";
const secondaryButtonClass =
  "min-h-11 rounded-control bg-interaction px-4 py-2 text-sm font-medium text-ink transition-[background-color,scale] duration-150 hover:bg-interaction-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100";

const backButtonClass =
  "min-h-11 rounded-control px-3 py-2 text-sm font-medium text-muted transition-[background-color,color,scale] duration-150 hover:bg-interaction hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[.96] motion-reduce:transition-none motion-reduce:active:scale-100";
// Match the theme tokens --color-interaction and --color-inverse-surface. Motion animates between them as numbers.
const quietButtonColor = "rgba(16, 16, 16, 0.05)";
const sendButtonColor = "rgba(16, 16, 16, 1)";

const serviceOptionStyles: Record<ServiceChoiceId, { selected: string; icon: string }> = {
  ...serviceStyles,
  "not-sure": {
    selected: "peer-checked:bg-surface-selected peer-checked:text-ink peer-checked:shadow-surface-hover",
    icon: "bg-white text-subtle",
  },
};

// Matches the Astro icon map in service-icons.ts.
const serviceIcons = {
  "websites-apps": Monitor,
  apps: AppWindow,
  "seo-ai-visibility": Search,
  "paid-campaigns": RadioTower,
  "ai-automation": Workflow,
  "not-sure": CircleHelp,
};

// direction is 1 forward, -1 back and 0 for a step that was restored from a draft, which appears without motion.
const stepVariants: Variants = {
  enter: (direction: number) => ({ opacity: direction ? 0 : 1, x: direction * 24 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.26, delay: 0.06, ease: easeOut } },
  exit: (direction: number) => ({
    opacity: direction ? 0 : 1,
    x: direction * -16,
    transition: { duration: direction ? 0.12 : 0 },
  }),
};

function currentTime() {
  return Date.now();
}

function wait(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function withUrlScheme(value: string) {
  const url = value.trim();
  return url && !/^[a-z][a-z\d+.-]*:/i.test(url) ? `https://${url}` : url;
}

function scrollFormIntoView(element: HTMLElement | null) {
  if (element && element.getBoundingClientRect().top < 80) element.scrollIntoView({ block: "start" });
}

export function ContactForm({
  contactEmail,
  copy,
  locale,
  services,
  privacy,
}: {
  contactEmail: string;
  copy: ContactFormCopy;
  locale: Locale;
  services: ServiceOption[];
  privacy: { href: string; label: string };
}) {
  const { draft, setDraft } = useContactDraft();
  const rootRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const pendingRequest = useRef<AbortController | null>(null);
  const autoAdvance = useRef<number | undefined>(undefined);
  const lastStepChange = useRef(0);
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [retrySeconds, setRetrySeconds] = useState(0);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceChoiceId>();
  const [chosenStep, setChosenStep] = useState<number>();
  const [direction, setDirection] = useState(0);
  const [contentHeight, setContentHeight] = useState<number>();
  const serviceOptions: readonly { id: ServiceChoiceId; name: string }[] = [
    ...services,
    { id: "not-sure", name: copy.serviceUnsure },
  ];
  const locationSearch = useSyncExternalStore(subscribeToLocation, getLocationSearch, getServerLocationSearch);
  const requestedServiceId = new URLSearchParams(locationSearch).get("service");
  const requestedService = services.find(({ id }) => id === requestedServiceId);
  const effectiveServiceId = selectedServiceId ?? draft?.service ?? requestedService?.id;
  const preselectedServiceLabel =
    selectedServiceId === undefined && effectiveServiceId === requestedService?.id ? requestedService?.name : undefined;

  const fields: DraftFields = {
    name: draft?.name ?? "",
    email: draft?.email ?? "",
    company: draft?.company ?? "",
    companyUrl: draft?.companyUrl ?? "",
    message: draft?.message ?? "",
    service: effectiveServiceId,
    budget: draft?.budget ?? "",
  };
  const hasDetails = Boolean(fields.company || fields.companyUrl || fields.budget);
  const step = chosenStep ?? firstOpenStep();
  const isLastStep = step === contactStep;
  const busy = status !== "idle";

  // A returning visitor continues at the first step that still needs an answer.
  function firstOpenStep() {
    if (!fields.service) return serviceStep;
    if (fields.message.trim().length < 20) return messageStep;
    return hasDetails || fields.name || fields.email ? contactStep : detailsStep;
  }

  useEffect(
    () => () => {
      pendingRequest.current?.abort();
      window.clearTimeout(autoAdvance.current);
    },
    [],
  );

  useEffect(() => {
    const restoreFromHistory = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      pendingRequest.current?.abort();
      pendingRequest.current = null;
      setStatus("idle");
      setErrors({});
      setIsDirty(false);
      setSelectedServiceId(undefined);
      setChosenStep(undefined);
      setDirection(0);
    };
    window.addEventListener("pageshow", restoreFromHistory);
    return () => window.removeEventListener("pageshow", restoreFromHistory);
  }, []);

  useEffect(() => {
    if (!retrySeconds) return;
    const timer = window.setTimeout(() => setRetrySeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [retrySeconds]);

  useEffect(() => {
    if (!isDirty && !draft) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isDirty, draft]);

  useEffect(() => {
    const content = measureRef.current;
    if (!content) return;
    const observer = new ResizeObserver(() => setContentHeight(content.offsetHeight));
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  // The check draws in the send button's position, then moves up into the thank-you message.
  useEffect(() => {
    if (status !== "confirming") return;
    const timer = window.setTimeout(() => setStatus("success"), reduceMotion ? 0 : checkDrawTime);
    return () => window.clearTimeout(timer);
  }, [status, reduceMotion]);

  // The send button leaves the page while sending, so keyboard focus returns to it after a failure.
  useEffect(() => {
    if (errors.form) submitRef.current?.focus();
  }, [errors.form]);

  function saveDraft(changes: Partial<DraftFields> = {}) {
    setDraft({ ...fields, submission: draft?.submission, ...changes });
    setIsDirty(true);
    // Filling in the last missing answer must not move the visitor to another step.
    setChosenStep(step);
  }

  function changeField(field: FieldName, value: string) {
    setErrors((current) =>
      current[field] || current.form ? { ...current, [field]: undefined, form: undefined } : current,
    );
    saveDraft({ [field]: value });
  }

  function goToStep(next: number) {
    window.clearTimeout(autoAdvance.current);
    lastStepChange.current = currentTime();
    setErrors({});
    setDirection(next > step ? 1 : -1);
    setChosenStep(next);
    scrollFormIntoView(rootRef.current);
  }

  function validateStep(target: number, values: DraftFields): Errors {
    if (target === serviceStep) return values.service ? {} : { service: copy.required };
    if (target === messageStep) return values.message.trim().length < 20 ? { message: copy.messageError } : {};
    if (target === detailsStep) {
      const url = values.companyUrl;
      const budgetTooLong = values.budget.length > 120;
      return {
        ...(url && !isHttpUrl(url) ? { companyUrl: copy.companyUrlError } : {}),
        ...(budgetTooLong ? { budget: copy.error } : {}),
      };
    }
    return {
      ...(values.name.trim() ? {} : { name: copy.required }),
      ...(emailPattern.test(values.email.trim()) ? {} : { email: copy.emailError }),
    };
  }

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRequest.current || currentTime() - lastStepChange.current < stepChangeGuard) return;
    const form = event.currentTarget;
    const values = { ...fields, companyUrl: withUrlScheme(fields.companyUrl) };
    if (values.companyUrl !== fields.companyUrl) saveDraft({ companyUrl: values.companyUrl });

    const stepErrors = validateStep(step, values);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      form.querySelector<HTMLElement>(`[name="${Object.keys(stepErrors)[0]}"]`)?.focus();
      return;
    }
    if (!isLastStep) {
      goToStep(step + 1);
      return;
    }
    if (retrySeconds > 0) return;

    // A restored draft can skip earlier steps, so the last step checks all of them.
    for (const earlier of [serviceStep, messageStep, detailsStep]) {
      const earlierErrors = validateStep(earlier, values);
      if (Object.keys(earlierErrors).length) {
        goToStep(earlier);
        setErrors(earlierErrors);
        return;
      }
    }

    const email = values.email.trim();
    const requestData = {
      name: values.name.trim(),
      email,
      company: values.company.trim(),
      companyUrl: values.companyUrl,
      service: values.service ?? "",
      budget: values.budget,
      message: values.message.trim(),
      locale,
      website: String(new FormData(form).get("website") ?? ""),
    };
    const payload = JSON.stringify(requestData);
    const previousSubmission = draft?.submission;
    const submission =
      previousSubmission?.payload === payload ? previousSubmission : { payload, id: crypto.randomUUID() };
    setDraft({ ...values, submission });
    const controller = new AbortController();
    pendingRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15_000);
    setErrors({});
    setStatus("sending");
    try {
      const [response] = await Promise.all([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ ...requestData, submissionId: submission.id }),
        }),
        wait(reduceMotion ? 0 : minimumSendingTime),
      ]);

      if (response.status === 429) setRetrySeconds(retryAfterSeconds(response.headers.get("retry-after")));
      if (!response.ok) throw new Error("Contact request failed");
      const result: unknown = await response.json();
      if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true)
        throw new Error("Invalid contact response");
      setDraft(undefined);
      setSubmittedEmail(email);
      setStatus("confirming");
      setIsDirty(false);
      setSelectedServiceId(undefined);
    } catch {
      setErrors({ form: copy.error });
      setStatus("idle");
    } finally {
      window.clearTimeout(timeout);
      pendingRequest.current = null;
    }
  }

  function stepContent() {
    if (step === serviceStep)
      return (
        <fieldset
          className="m-0 grid min-w-0 gap-3 border-0 p-0"
          aria-describedby={errors.service ? "contact-service-error" : undefined}
        >
          <legend className="mb-3 p-0">
            <h2 className={stepHeadingClass}>{copy.service}</h2>
          </legend>
          <div className="grid grid-cols-2 gap-3 max-narrow:grid-cols-1">
            {serviceOptions.map((service) => {
              const Icon = serviceIcons[service.id];
              const styles = serviceOptionStyles[service.id];
              return (
                <label
                  key={service.id}
                  className={`group relative cursor-pointer ${service.id === "not-sure" ? "col-span-2 max-narrow:col-span-1" : ""}`}
                >
                  <input
                    className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0"
                    type="radio"
                    name="service"
                    value={service.id}
                    required
                    checked={effectiveServiceId === service.id}
                    onChange={() => {
                      setSelectedServiceId(service.id);
                      changeField("service", service.id);
                    }}
                    onClick={(event) => {
                      // Arrow keys also fire click, with detail 0. Keyboard users move on with Enter.
                      if (event.detail === 0) return;
                      window.clearTimeout(autoAdvance.current);
                      autoAdvance.current = window.setTimeout(() => goToStep(messageStep), autoAdvanceDelay);
                    }}
                  />
                  <span
                    className={`flex min-h-14 flex-wrap items-center gap-3 rounded-control bg-surface-subtle p-2 text-sm text-muted shadow-surface transition-[background-color,color,box-shadow,scale] duration-150 ease-[var(--ease-out)] group-hover:bg-white group-hover:shadow-surface-hover peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus peer-active:scale-[.96] motion-reduce:transition-none motion-reduce:peer-active:scale-100 ${styles.selected}`}
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-inset shadow-surface ${styles.icon}`}
                      aria-hidden="true"
                    >
                      <Icon className="size-4.5" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-[min(100%,8rem)] flex-1">{service.name}</span>
                  </span>
                </label>
              );
            })}
          </div>
          {errors.service ? (
            <span id="contact-service-error" className="text-sm text-error" role="alert">
              {errors.service}
            </span>
          ) : null}
        </fieldset>
      );

    if (step === messageStep)
      return (
        <div className="grid min-w-0 gap-4">
          {preselectedServiceLabel ? (
            <p className="m-0 inline-flex max-w-full flex-wrap justify-self-start rounded-control bg-interaction px-3 py-2 text-sm text-muted">
              <span>{copy.selectedService}: </span>&nbsp;
              <strong className="font-semibold text-ink">{preselectedServiceLabel}</strong>
            </p>
          ) : null}
          <h2 className={stepHeadingClass}>
            <label htmlFor="contact-message">{copy.message}</label>
          </h2>
          <textarea
            id="contact-message"
            className={`min-h-44 resize-none p-4 ${fieldControlClass}`}
            name="message"
            value={fields.message}
            autoComplete="off"
            placeholder={copy.placeholder}
            minLength={20}
            maxLength={5000}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            onChange={(event) => changeField("message", event.target.value)}
          />
          {errors.message ? (
            <span id="contact-message-error" className="text-sm text-error" role="alert">
              {errors.message}
            </span>
          ) : null}
        </div>
      );

    if (step === detailsStep)
      return (
        <div className="grid min-w-0 gap-4">
          <h2 className={stepHeadingClass}>{copy.detailsTitle}</h2>
          <div className="grid grid-cols-2 gap-4 max-narrow:grid-cols-1">
            <Field id="contact-company" label={copy.company} hint={copy.companyOptional}>
              <input
                id="contact-company"
                className={`min-h-12 ${fieldControlClass}`}
                name="company"
                value={fields.company}
                onChange={(event) => saveDraft({ company: event.target.value })}
                autoComplete="organization"
                placeholder={copy.companyPlaceholder}
                maxLength={120}
              />
            </Field>
            <Field
              id="contact-company-url"
              label={copy.companyUrl}
              hint={copy.companyOptional}
              error={errors.companyUrl}
            >
              <input
                id="contact-company-url"
                className={`min-h-12 ${fieldControlClass}`}
                type="url"
                name="companyUrl"
                value={fields.companyUrl}
                autoComplete="url"
                placeholder={copy.companyUrlPlaceholder}
                inputMode="url"
                maxLength={2048}
                spellCheck={false}
                aria-invalid={Boolean(errors.companyUrl)}
                aria-describedby={errors.companyUrl ? "contact-company-url-error" : undefined}
                onChange={(event) => changeField("companyUrl", event.target.value)}
              />
            </Field>
          </div>
          <Field id="contact-budget" label={copy.budget} hint={copy.companyOptional} error={errors.budget}>
            <input
              id="contact-budget"
              className={`min-h-12 ${fieldControlClass}`}
              type="text"
              name="budget"
              value={fields.budget}
              placeholder={copy.budgetPlaceholder}
              maxLength={120}
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={errors.budget ? "contact-budget-error" : undefined}
              onChange={(event) => changeField("budget", event.target.value)}
            />
          </Field>
        </div>
      );

    return (
      <div className="grid min-w-0 gap-4">
        <h2 className={stepHeadingClass}>{copy.contactTitle}</h2>
        <div className="grid grid-cols-2 gap-4 max-narrow:grid-cols-1">
          <Field id="contact-name" label={copy.name} error={errors.name}>
            <input
              id="contact-name"
              className={`min-h-12 ${fieldControlClass}`}
              name="name"
              value={fields.name}
              autoComplete="name"
              placeholder={copy.namePlaceholder}
              maxLength={100}
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              onChange={(event) => changeField("name", event.target.value)}
            />
          </Field>
          <Field id="contact-email" label={copy.email} error={errors.email}>
            <input
              id="contact-email"
              className={`min-h-12 ${fieldControlClass}`}
              type="email"
              name="email"
              value={fields.email}
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              inputMode="email"
              maxLength={254}
              spellCheck={false}
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : "contact-form-note"}
              onChange={(event) => changeField("email", event.target.value)}
            />
          </Field>
        </div>
      </div>
    );
  }

  const retryLabel =
    retrySeconds > 0
      ? ` (${new Intl.NumberFormat(locale, { style: "unit", unit: "second", unitDisplay: "narrow" }).format(retrySeconds)})`
      : "";
  const sendLabel = `${copy.submit}${retryLabel}`;
  // A restored draft or a failed send shows the send button at once.
  const growsFromContinue = direction !== 0 && !errors.form;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        ref={rootRef}
        className="-m-2 scroll-mt-24 overflow-clip p-2"
        initial={false}
        animate={{
          // The step and button areas animate their own height. The box follows them until the thank-you message takes over.
          height:
            status === "idle" || status === "sending" || contentHeight === undefined ? "auto" : contentHeight + 16,
        }}
        transition={{ duration: 0.34, ease: easeOut }}
      >
        <div ref={measureRef}>
          {status === "success" ? (
            <SuccessMessage
              copy={copy}
              email={submittedEmail}
              onMounted={() => scrollFormIntoView(rootRef.current)}
              onAnother={() => {
                setDirection(0);
                setChosenStep(serviceStep);
                setStatus("idle");
              }}
            />
          ) : (
            <form
              className="grid min-w-0 gap-6"
              method="post"
              action="/api/contact"
              aria-busy={busy}
              noValidate
              onSubmit={onSubmit}
            >
              <div
                className={`grid min-w-0 gap-6 transition-opacity duration-200 motion-reduce:transition-none ${busy ? "opacity-0" : ""}`}
                inert={busy}
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-1 gap-1.5" aria-hidden="true">
                    {Array.from({ length: stepCount }, (_, index) => (
                      <span key={index} className="h-1 flex-1 overflow-hidden rounded-pill bg-interaction-strong">
                        <motion.span
                          className="block size-full origin-left rounded-pill bg-inverse-surface"
                          initial={false}
                          animate={{ scaleX: index <= step ? 1 : 0 }}
                          transition={{ duration: 0.34, ease: easeOut }}
                        />
                      </span>
                    ))}
                  </div>
                  <p className="m-0 shrink-0 text-sm text-muted">
                    {copy.step.replace("{current}", String(step + 1)).replace("{total}", String(stepCount))}
                  </p>
                </div>
                <AutoHeight instant={direction === 0}>
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.div
                      key={step}
                      className="min-w-0"
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <StepFocus takesFocus={direction !== 0}>{stepContent()}</StepFocus>
                    </motion.div>
                  </AnimatePresence>
                </AutoHeight>
              </div>

              <div className="absolute top-auto -left-[10000px] size-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <AutoHeight instant={direction === 0}>
                <div className="grid min-w-0 gap-4">
                  <div
                    className={`flex min-h-14 items-center gap-3 ${busy ? "justify-center" : `${isLastStep ? "max-narrow:flex-col-reverse max-narrow:items-stretch" : ""} ${step === serviceStep ? "justify-end" : "justify-between"}`}`}
                  >
                    {busy ? (
                      <SendCircle confirmed={status === "confirming"} animateCheck />
                    ) : (
                      <>
                        {step === serviceStep ? null : (
                          <motion.button
                            layout="position"
                            layoutDependency={isLastStep}
                            transition={{ duration: 0.34, ease: easeOut }}
                            className={backButtonClass}
                            type="button"
                            onClick={() => goToStep(step - 1)}
                          >
                            {copy.back}
                          </motion.button>
                        )}
                        {isLastStep ? (
                          // The quiet continue button grows into the send button. Its label fades in near the end of the move.
                          <motion.div
                            layoutId="contact-send"
                            layoutDependency={`${status}-${isLastStep}`}
                            transition={{ duration: 0.45, ease: easeOut }}
                            className="min-w-0"
                            style={{ borderRadius: 999 }}
                            initial={growsFromContinue ? { backgroundColor: quietButtonColor } : false}
                            animate={{ backgroundColor: sendButtonColor }}
                          >
                            <motion.div
                              initial={growsFromContinue ? { opacity: 0 } : false}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2, delay: 0.2 }}
                            >
                              <button
                                ref={submitRef}
                                className="pill-button pill-button--dark inline-flex min-h-[52px] max-w-full min-w-0 items-center gap-3.5 rounded-pill py-2 pr-2.5 pl-4 text-ui font-semibold text-white shadow-dark-surface disabled:cursor-wait disabled:opacity-65 max-narrow:w-full max-narrow:justify-between"
                                type="submit"
                                disabled={!hydrated || retrySeconds > 0}
                              >
                                <span className="leading-control block min-w-0 overflow-hidden">
                                  <span className="pill-button__label-track grid">
                                    <span className="col-start-1 row-start-1 flex items-center gap-2">{sendLabel}</span>
                                    <span className="col-start-1 row-start-1 block translate-y-full" aria-hidden="true">
                                      {sendLabel}
                                    </span>
                                  </span>
                                </span>
                                <span
                                  className="pill-button__icon relative size-8 flex-none overflow-hidden rounded-pill bg-white text-ink"
                                  aria-hidden="true"
                                >
                                  <ArrowRight
                                    className="pill-button__arrow pill-button__arrow--right absolute inset-[7px] size-[18px]"
                                    strokeWidth={1.7}
                                  />
                                  <ArrowUpRight
                                    className="pill-button__arrow pill-button__arrow--up-right absolute inset-[7px] size-[18px] [transform:translate(-6px,6px)_scale(.8)] opacity-0"
                                    strokeWidth={1.7}
                                  />
                                </span>
                              </button>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.div
                            layoutId="contact-send"
                            layoutDependency={`${status}-${isLastStep}`}
                            transition={{ duration: 0.45, ease: easeOut }}
                            style={{ borderRadius: 12 }}
                          >
                            <button className={secondaryButtonClass} type="submit" disabled={!hydrated}>
                              {step === detailsStep && !hasDetails ? copy.skip : copy.next}
                            </button>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>

                  <p className="sr-only" role="status">
                    {status === "sending" ? copy.sending : ""}
                  </p>

                  {isLastStep || errors.form ? (
                    <div
                      className={`transition-opacity duration-200 motion-reduce:transition-none ${busy ? "opacity-0" : ""}`}
                    >
                      {isLastStep ? (
                        <p id="contact-form-note" className="m-0 max-w-[36rem] text-sm text-muted">
                          {copy.note}{" "}
                          <a href={privacy.href} className="underline underline-offset-2">
                            {privacy.label}
                          </a>
                        </p>
                      ) : null}
                      {errors.form ? (
                        <p className="mt-4 mb-0 text-sm text-error" role="alert">
                          {errors.form}{" "}
                          <a className="underline underline-offset-2" href={`mailto:${contactEmail}`}>
                            {contactEmail}
                          </a>
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </AutoHeight>
            </form>
          )}
        </div>
      </motion.div>
    </MotionConfig>
  );
}

function subscribeToLocation(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

function getLocationSearch() {
  return window.location.search;
}

function getServerLocationSearch() {
  return "";
}

function StepFocus({ takesFocus, children }: { takesFocus: boolean; children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Only a step the visitor moved to takes focus. A page load must not jump to the form.
  const focusOnMount = useRef(takesFocus);

  useEffect(() => {
    if (!focusOnMount.current) return;
    const panel = panelRef.current;
    const field =
      panel?.querySelector<HTMLElement>('input:checked, input:not([type="radio"]), textarea') ??
      panel?.querySelector<HTMLElement>("input");
    field?.focus({ preventScroll: true });
  }, []);

  return <div ref={panelRef}>{children}</div>;
}

// Animates to the height of its content. The padding keeps focus outlines and shadows inside the clip.
function AutoHeight({ instant, children }: { instant: boolean; children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(() => setHeight(content.offsetHeight));
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="-m-2 min-w-0 overflow-clip p-2"
      initial={false}
      animate={{ height: height === undefined ? "auto" : height + 16 }}
      transition={{ duration: instant || reduceMotion ? 0 : 0.34, ease: easeOut }}
    >
      <div ref={contentRef} className="relative min-w-0">
        {children}
      </div>
    </motion.div>
  );
}

// One shape from the send button to the thank-you message. The shared layoutId moves it between the two places.
function SendCircle({ confirmed, animateCheck }: { confirmed: boolean; animateCheck: boolean }) {
  return (
    <motion.div
      layoutId="contact-send"
      transition={{ duration: 0.45, ease: easeOut }}
      className={`grid size-14 flex-none place-items-center text-white transition-colors duration-300 motion-reduce:transition-none ${confirmed ? "bg-green-600" : "bg-inverse-surface"}`}
      style={{ borderRadius: 999 }}
      aria-hidden="true"
    >
      {confirmed ? (
        <svg className="size-6" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 12.5 10 17.5 19 7"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animateCheck ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.36, delay: 0.08, ease: "easeOut" }}
          />
        </svg>
      ) : (
        <motion.span
          className="grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.16, delay: 0.24 }}
        >
          <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" />
        </motion.span>
      )}
    </motion.div>
  );
}

function SuccessMessage({
  copy,
  email,
  onMounted,
  onAnother,
}: {
  copy: ContactFormCopy;
  email: string;
  onMounted: () => void;
  onAnother: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    onMounted();
    // The heading takes focus once, when the message appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center py-12 text-center" role="status" aria-live="polite">
      <SendCircle confirmed animateCheck={false} />
      <motion.div
        className="mt-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.22, ease: easeOut }}
      >
        <h2 ref={headingRef} tabIndex={-1} className="m-0 max-w-[32rem] text-heading-lg text-ink outline-none">
          {copy.successTitle}
        </h2>
        <p className="mt-4 mb-0 max-w-[32rem] text-base/6 text-muted">{copy.successCopy.replace("{email}", email)}</p>
        <button className={`mt-8 ${secondaryButtonClass}`} type="button" onClick={onAnother}>
          {copy.another}
        </button>
      </motion.div>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-w-0 gap-2">
      <label
        className={`flex flex-wrap items-baseline gap-2 text-sm font-medium ${error ? "text-error" : "text-ink"}`}
        htmlFor={id}
      >
        <span>{label}</span>
        {hint ? <span className="font-normal text-muted italic">({hint})</span> : null}
      </label>
      {children}
      {error ? (
        <span id={`${id}-error`} className="text-sm text-error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
