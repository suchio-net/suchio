import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import type { ServiceAnimation as ServiceAnimationDefinition } from "@/lib/service-catalog";
import type { Locale } from "@/lib/i18n";

const WebExperienceAnimation = lazy(() =>
  import("@/components/offer-animations/web-experience-animation").then(({ WebExperienceAnimation: Component }) => ({
    default: Component,
  })),
);
const OptimizationSearchAnimation = lazy(() =>
  import("@/components/offer-animations/optimization-search-animation").then(
    ({ OptimizationSearchAnimation: Component }) => ({ default: Component }),
  ),
);
const CampaignGrowthAnimation = lazy(() =>
  import("@/components/offer-animations/campaign-growth-animation").then(({ CampaignGrowthAnimation: Component }) => ({
    default: Component,
  })),
);
const AutomationFlowAnimation = lazy(() =>
  import("@/components/offer-animations/automation-flow-animation").then(({ AutomationFlowAnimation: Component }) => ({
    default: Component,
  })),
);

export function OfferAnimation({ animation, locale }: { animation: ServiceAnimationDefinition; locale: Locale }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full min-h-0 w-full">
      <AnimationBoundary key={animation.type} type={animation.type}>
        {ready ? (
          <Suspense fallback={<StaticOfferVisual type={animation.type} />}>
            {renderDeferredAnimation(animation, locale)}
          </Suspense>
        ) : (
          <StaticOfferVisual type={animation.type} />
        )}
      </AnimationBoundary>
    </div>
  );
}

class AnimationBoundary extends Component<
  { children: ReactNode; type: ServiceAnimationDefinition["type"] },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    console.error(JSON.stringify({ event: "illustration.failed", illustration: this.props.type }));
  }
  render() {
    return this.state.failed ? <StaticOfferVisual type={this.props.type} failed /> : this.props.children;
  }
}

// Inline geometry remains available without JavaScript or downloaded illustration chunks.
function StaticOfferVisual({ type, failed = false }: { type: ServiceAnimationDefinition["type"]; failed?: boolean }) {
  return (
    <svg
      data-offer-fallback={type}
      data-failed={failed}
      className="h-full w-full text-brand-500"
      viewBox="0 0 320 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      focusable="false"
    >
      {type === "campaign" ? (
        <>
          <rect className="text-line-strong" x="16" y="32" width="176" height="176" rx="14" />
          <path d="M36 196v-12m14 12v-16m14 16v-20m14 20v-28m14 28v-34m14 34v-40m14 40v-50m14 50v-60" />
          <rect className="text-line-strong" x="204" y="32" width="100" height="100" rx="14" />
          <rect className="text-line-strong" x="204" y="144" width="100" height="64" rx="14" />
        </>
      ) : type === "automation" ? (
        <>
          <rect className="text-line-strong" x="16" y="40" width="148" height="140" rx="14" />
          <path d="M32 92h96M32 112h116M32 132h72" />
          <rect className="text-line-strong" x="176" y="40" width="128" height="160" rx="14" />
          <path d="M192 76h64M192 104h80M192 132h56" />
        </>
      ) : type === "optimization" ? (
        <>
          <rect x="136" y="24" width="152" height="32" rx="16" />
          <rect className="text-line-strong" x="32" y="70" width="256" height="92" rx="14" />
          <path d="M52 98h196M52 118h172M52 138h120" />
          {[32, 120, 208].map((x) => (
            <rect className="text-line-strong" key={x} x={x} y="180" width="80" height="40" rx="10" />
          ))}
        </>
      ) : (
        <>
          <rect className="text-line-strong" x="16" y="44" width="244" height="164" rx="12" />
          <path d="M36 70h28M36 104h100M36 124h76" />
          <rect x="36" y="150" width="64" height="20" rx="10" />
          <rect x="150" y="84" width="90" height="80" rx="8" />
          <rect x="244" y="96" width="60" height="124" rx="14" />
        </>
      )}
    </svg>
  );
}

function renderDeferredAnimation(animation: ServiceAnimationDefinition, locale: Locale) {
  switch (animation.type) {
    case "web-experience":
      return <WebExperienceAnimation copy={animation.copy} />;
    case "optimization":
      return <OptimizationSearchAnimation copy={animation.copy} />;
    case "campaign":
      return <CampaignGrowthAnimation copy={animation.copy} locale={locale} />;
    case "automation":
      return <AutomationFlowAnimation copy={animation.copy} />;
    default: {
      const exhaustive: never = animation;
      return exhaustive;
    }
  }
}
