// The request assistant of Entwurf B: one step at a time, validated per step, with photo
// previews. In the draft it sends nothing and shows the collected request instead.

const form = document.querySelector<HTMLFormElement>("[data-wizard]");
const done = document.querySelector<HTMLElement>("[data-done]");

if (form && done) {
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>("[data-step]")];
  const bars = [...form.querySelectorAll<HTMLLIElement>(".progress-bar li")];
  const number = form.querySelector<HTMLElement>("[data-step-number]")!;
  const name = form.querySelector<HTMLElement>("[data-step-name]")!;
  const nav = form.querySelector<HTMLElement>("[data-nav]")!;
  const back = form.querySelector<HTMLButtonElement>("[data-back]")!;
  const next = form.querySelector<HTMLButtonElement>("[data-next]")!;
  const submit = form.querySelector<HTMLButtonElement>("[data-submit]")!;
  const photos = form.querySelector<HTMLInputElement>("[data-photos]")!;
  const previews = form.querySelector<HTMLElement>("[data-previews]")!;
  const summary = done.querySelector<HTMLElement>("[data-summary]")!;
  let current = 0;
  let previewUrls: string[] = [];

  const show = (index: number, focus = true) => {
    current = index;
    steps.forEach((step, i) => step.classList.toggle("current", i === index));
    bars.forEach((bar, i) => bar.classList.toggle("done", i <= index));
    number.textContent = String(index + 1);
    name.textContent = bars[index].textContent;
    back.hidden = index === 0;
    next.hidden = index === steps.length - 1;
    submit.hidden = index !== steps.length - 1;
    if (focus) {
      form.scrollIntoView({ block: "start", behavior: "smooth" });
      steps[index].querySelector<HTMLElement>("input, textarea")?.focus({ preventScroll: true });
    }
  };

  // Native validation messages for the first invalid field of the current step.
  const valid = () => {
    const fields = [...steps[current].querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")];
    fields.forEach((field) => field.setAttribute("aria-invalid", String(!field.checkValidity())));
    const invalid = fields.find((field) => !field.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    return false;
  };

  next.addEventListener("click", () => {
    if (valid()) show(current + 1);
  });
  back.addEventListener("click", () => show(current - 1));

  // Enter in a text field moves on instead of submitting the whole form.
  form.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement;
    if (event.key === "Enter" && target instanceof HTMLInputElement && current < steps.length - 1) {
      event.preventDefault();
      next.click();
    }
  });

  photos.addEventListener("change", () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    previewUrls = [...(photos.files ?? [])].map((file) => URL.createObjectURL(file));
    previews.replaceChildren(
      ...previewUrls.map((url, i) => {
        const item = document.createElement("li");
        const image = document.createElement("img");
        image.src = url;
        image.alt = photos.files![i].name;
        item.appendChild(image);
        return item;
      }),
    );
  });

  const labelOf = (field: string) => {
    const checked = form.querySelector<HTMLInputElement>(`input[name="${field}"]:checked`);
    return checked?.closest("label")?.textContent?.trim() ?? "";
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!valid()) return;
    const data = new FormData(form);
    const count = photos.files?.length ?? 0;
    const rows: [string, string][] = [
      ["Leistung", labelOf("leistung")],
      ["Ort", String(data.get("ort") ?? "")],
      ["Fläche", labelOf("flaeche")],
      ["Wunsch", String(data.get("wunsch") || "keine Angabe")],
      ["Termin", labelOf("termin")],
      ["Fotos", count ? `${count} ${count === 1 ? "Foto" : "Fotos"}` : "keine"],
      ["Name", String(data.get("name") ?? "")],
      ["Telefon", String(data.get("telefon") ?? "")],
      ["E-Mail", String(data.get("email") || "keine Angabe")],
    ];
    summary.replaceChildren(
      ...rows.map(([term, value]) => {
        const row = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = term;
        dd.textContent = value;
        row.appendChild(dt);
        row.appendChild(dd);
        return row;
      }),
    );
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });

  done.querySelector("[data-restart]")?.addEventListener("click", () => {
    form.reset();
    previews.replaceChildren();
    form.querySelectorAll("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
    done.hidden = true;
    form.hidden = false;
    show(0);
  });

  // A service page links here with ?leistung=<slug> and selects that service in advance.
  const preset = new URLSearchParams(location.search).get("leistung");
  const option =
    preset && form.querySelector<HTMLInputElement>(`input[name="leistung"][value="${CSS.escape(preset)}"]`);
  if (option) option.checked = true;

  nav.hidden = false;
  show(0, false);
}

// A module, so that its names stay local to this file.
export {};
