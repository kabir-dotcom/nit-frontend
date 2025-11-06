const About = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900">About Natural Immunotherapy</h1>
        <p className="mt-6 text-base leading-7 text-slate-600">
          We blend functional lab analysis, microbiome mapping, and nervous system retraining to help individuals
          reverse chronic immune dysfunction. Each protocol is crafted by practitioners with backgrounds in integrative
          medicine, naturopathy, and clinical nutrition.
        </p>
        <div className="mt-10 space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Our Philosophy</h2>
          <ul className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <li className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-primary-500">Root-cause diagnostics</p>
              <p className="mt-1">
                Precision labs reveal stealth pathogens, toxic load, and immune imbalance.
              </p>
            </li>
            <li className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-primary-500">Staged protocols</p>
              <p className="mt-1">
                We sequence detox, immune modulation, and resilience-building for sustainable change.
              </p>
            </li>
            <li className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-primary-500">Multi-disciplinary team</p>
              <p className="mt-1">
                Clinicians, nutritionists, and health coaches collaborate weekly on every case.
              </p>
            </li>
            <li className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-primary-500">Patient empowerment</p>
              <p className="mt-1">
                Education, nervous system retraining, and habit stacking anchor long-term results.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
