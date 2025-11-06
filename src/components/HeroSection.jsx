const HeroSection = ({ title, subtitle, ctaText = 'Explore Care Plans', onCtaClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-100">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-primary-200 blur-3xl" />
        <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-accent-200 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-500">
            Personalized protocols
          </span>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-200 transition hover:-translate-y-0.5 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              {ctaText}
            </button>
            <a
              href="#journey"
              className="text-sm font-semibold text-primary-500 underline-offset-4 hover:text-primary-600 hover:underline"
            >
              View the healing journey
            </a>
          </div>
        </div>
        <div className="mt-12 hidden flex-1 justify-end lg:flex">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 rounded-3xl bg-white/60 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-primary-100 bg-white p-6 shadow-xl shadow-primary-100">
              <p className="text-sm font-semibold text-primary-500">Recovery Spotlight</p>
              <p className="mt-3 text-sm text-slate-600">
                “After 6 months of guided detox and immune stabilization, my flare-ups dropped by 80%.”
              </p>
              <div className="mt-6 space-y-2 text-sm text-slate-500">
                <p className="flex items-center justify-between">
                  <span>Energy resilience</span>
                  <span className="font-semibold text-primary-500">+65%</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Gut restoration</span>
                  <span className="font-semibold text-primary-500">+72%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
