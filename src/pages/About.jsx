import { Link } from 'react-router-dom';
import missionImage from '../assets/photo/Rectangle 153.png';
import sectionBg from '../assets/photo/bg.png';

const principles = [
  {
    title: 'Detoxify',
    description: 'Remove toxins and excess proteins from blood and vital organs so cells can breathe again.',
  },
  {
    title: 'Replenish',
    description: 'Supply 77 minerals and 13 vitamins that re-establish balance and metabolic clarity.',
  },
  {
    title: 'Reprogram',
    description: 'Reactivate innate cellular intelligence to repair, adapt, and protect without drugs.',
  },
];

const missionItems = [
  'Bring NIT to every district and every country.',
  'Educate doctors, researchers, and families about cellular intelligence.',
  'Launch Cancer-Free District and Thalassemia-Free District campaigns worldwide.',
  'Build the Medha Institute of Natural Science for education and research.',
];

const achievements = [
  'Over 10,000 patients fully recovered through Natural Immunotherapy.',
  '95% success rate in blood cancer and thalassemia cases.',
  'Proven recovery in chronic kidney disease without dialysis.',
  'Early success in reversing autism, SMA, and vitiligo.',
  'Recognition from global wellness communities and CSR partners.',
];

const About = () => {
  return (
    <div className="min-h-screen w-full bg-[#f4fbe7] text-slate-900">
      {/* Section 1 - Introduction */}
      <section className="bg-[#f4fbe7]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:px-8">
          <div className="flex-1">
            <div className="rounded-[36px] border border-[#e8f5d8] bg-white/95 p-8 shadow-[0_26px_52px_rgba(0,0,0,0.08)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#0d4f16]">About us</p>
              <h1 className="mt-4 text-[2.5rem] leading-tight font-semibold text-[#0b3d14] sm:text-[3.2rem]">
                We Are Redefining the Future of Healing.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#1f3b1f]">
              Natural Immunotherapy (NIT) is not just a therapy; it is a scientific awakening. It restores what your
              body was always meant to do: heal itself. Our mission is to educate, empower, and help people rediscover
              the intelligence hidden within their own cells. Through Cellular Intelligence, Nutrient Signaling, and
              Toxin Detoxification, NIT offers a new direction-beyond chemo, beyond radiation, beyond the fear of
              genetics.
              </p>
              <a
                href="#how-nit-works"
                className="mt-10 inline-flex items-center gap-3 rounded-[28px] border border-[#0d8b1f]/10 bg-[#0d8b1f] px-7 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white shadow-[0_18px_32px_rgba(15,121,39,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0b5f10]"
              >
                Explore
                <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-white text-[#0d8b1f] shadow-inner shadow-[#0d8b1f]/30">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M7.5 4.5 12.5 10 7.5 15.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center lg:justify-end">
            <div className="relative h-[16rem] w-[16rem] overflow-hidden rounded-[36px] border border-[#e8f5d8] bg-white shadow-[0_24px_46px_rgba(0,0,0,0.12)] sm:h-[20rem] sm:w-[20rem] lg:h-[24rem] lg:w-[26rem]">
              <img src={missionImage} alt="Natural therapy consultation" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 p-4 text-slate-800 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0f8f28]">Natural Immunotherapy</p>
                <p className="mt-2 text-sm font-medium">
                  Restoring cellular intelligence with micronutrients, detox, and guided healing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - The Vision */}
      <section id="vision" className="bg-[#f2ffe3] py-16">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="rounded-[36px] bg-[#f6ffe9] p-8 shadow-[0_22px_48px_rgba(22,108,39,0.18)] lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
              <div className="lg:w-1/2">
                <span className="inline-flex rounded-full bg-[#f8d547] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3c1e]">
                  The vision
                </span>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#0d4f16] sm:text-4xl">
                  A Disease-Free Planet Powered by Nature, Guided by Science.
                </h2>
              </div>
              <div className="lg:w-1/2 text-lg leading-8 text-[#1f3b1f] font-lora">
                <p>
                  Every cell is born intelligent. It knows how to survive, adapt, and repair until toxins and nutritional
                  deficiencies cloud that wisdom. Our vision is to restore that natural intelligence in every human body,
                  creating a world where diseases are not suppressed but truly reversed through biological balance and
                  nutritional harmony.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Founder */}
      <section className="bg-[#f7ffe8] py-16">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
          <div className="rounded-[36px] border border-[#dff5c2] bg-white/80 p-8 shadow-[0_24px_56px_rgba(15,121,39,0.15)] lg:p-12">
            <span className="inline-flex rounded-full bg-[#0d8b1f] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Founder's message
            </span>
            <h3 className="mt-4 text-3xl font-semibold text-[#0b3d14]">From the Desk of Subhankar Sarkar</h3>
            <p className="mt-1 text-sm uppercase tracking-[0.25em] text-[#6c7b65]">
              Founder, Save Medha Foundation &amp; Dantura Botanics
            </p>
            <div className="mt-8 space-y-6 text-lg leading-8 text-[#1e371f] font-lora">
              <p>
                "When I began my journey in healthcare, I saw countless patients-cancer, thalassemia, kidney failure-all
                told the same thing: 'Nothing more can be done.' But what I discovered changed everything. These were not
                genetic failures. They were nutritional and toxin-related imbalances that could be corrected naturally.
                Once the body received the right micronutrients-the exact vitamins and minerals that drive cellular
                decisions-the recovery began on its own."
              </p>
              <p>
                Natural Immunotherapy was born from this observation-not as an alternative therapy, but as a return to
                biological truth. Today, thousands of patients around the world are living proof that the body, when
                guided correctly, can heal any system that has gone wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Philosophy */}
      <section id="how-nit-works" className="relative overflow-hidden bg-[#0a3c13] py-20 text-white">
        <img
          src={sectionBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="relative mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:p-12">
            <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100">
              Our philosophy
            </span>
            <h3 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Your Body Is Not Weak - It Is Misguided.</h3>
            <p className="mt-6 text-lg leading-8 text-slate-100">
              Every disease is a sign of miscommunication between cells. When toxins enter your body or when essential
              nutrients are missing, your cells receive wrong signals. Natural Immunotherapy repairs that communication
              using pure micronutrients-no chemicals, no herbs, no artificial stimulants. The result is not suppression
              of symptoms but a re-education of cells to function intelligently once again.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-[28px] border border-white/20 bg-[#0f4f1c] p-6 shadow-[0_18px_36px_rgba(0,0,0,0.25)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#9bf9c4]">
                    {principle.title}
                  </p>
                  <p className="mt-4 text-base leading-7 text-white/90">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Global Mission */}
      <section className="bg-[#f7ffe8] py-16">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="grid gap-10 rounded-[36px] bg-white p-8 shadow-[0_22px_48px_rgba(22,108,39,0.12)] lg:grid-cols-[1.05fr,0.95fr] lg:p-12">
            <div>
              <span className="inline-flex rounded-full bg-[#f8d547] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3c1e]">
                Global mission
              </span>
              <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#0d4f16] sm:text-4xl">
                Making Natural Immunotherapy a Global Movement.
              </h3>
              <p className="mt-4 text-lg leading-8 text-[#1f3b1f] font-lora">
                Through Save Medha Foundation (non-profit) and Dantura Botanics Pvt. Ltd. (research and formulation),
                our mission is action-focused. We are building a network of educators, clinicians, and advocates who can
                bring Cellular Intelligence to every family.
              </p>
            </div>
            <div className="rounded-[28px] border border-[#e6f6d3] bg-[#f6ffe9] p-6 shadow-inner shadow-white/40">
              <ul className="space-y-4 text-base leading-7 text-[#1b3c1e]">
                {missionItems.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0d8b1f] text-white shadow-[0_10px_18px_rgba(15,121,39,0.25)]">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m6 10 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - Achievements */}
      <section id="achievements" className="bg-white py-16">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="rounded-[36px] bg-[#f6ffe9] p-8 shadow-[0_28px_64px_rgba(22,108,39,0.12)] lg:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-[#0d8b1f] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white">
                  Our achievements
                </span>
                <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#0d4f16] sm:text-4xl">
                  Real People. Real Recovery. Real Proof.
                </h3>
              </div>
              <a
                href="/#patient-stories"
                className="inline-flex items-center gap-3 rounded-full border border-[#0d8b1f]/20 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0d8b1f] shadow-[0_16px_32px_rgba(20,110,33,0.2)] transition hover:-translate-y-0.5 hover:bg-[#f8d547] hover:text-[#1b3c1e]"
              >
                📚 See Recovery Stories
              </a>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement}
                  className="rounded-[28px] border border-white bg-white/80 p-6 text-base leading-7 text-[#1f3b1f] shadow-sm"
                >
                  {achievement}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 - Science Behind NIT */}
      <section id="science" className="bg-[#f7ffe8] py-16">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
          <div className="overflow-hidden rounded-[36px] border border-[#e6f6d3] bg-gradient-to-br from-[#0b5f10] via-[#0f8f28] to-[#31a12d] p-8 text-white shadow-[0_30px_60px_rgba(0,0,0,0.25)] lg:p-12">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex rounded-full bg-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100">
                Science behind NIT
              </span>
              <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">
                When Nutrition Meets Intelligence, Medicine Evolves.
              </h3>
              <p className="text-lg leading-8 text-white/90 font-lora">
                Modern science isolates disease; NIT studies the intelligence of the body as a whole. Our research focuses on
                how cells interpret signals, and how micronutrients control decisions at the DNA level. Through controlled
                nutrient therapy, we have observed reactivation of stem-like behavior in bone marrow, restoration of liver detox
                capacity, and normalization of immune response without drugs.
              </p>
            </div>
            <a
              href="#vision"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-base font-semibold uppercase tracking-[0.25em] text-[#0d4f16] shadow-[0_18px_36px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:bg-[#f8d547] hover:text-[#1b3c1e]"
            >
              🔎 Explore the Science of Healing
            </a>
          </div>
        </div>
      </section>

      {/* Section 8 - Join the Movement */}
      <section className="bg-[#f7ffe8] py-20">
        <div className="mx-auto max-w-[900px] px-6 text-center lg:px-8">
          <span className="inline-flex rounded-full bg-[#f8d547] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3c1e]">
            Join the movement
          </span>
          <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#0b3d14] sm:text-4xl">
            Be Part of the Natural Immunotherapy Revolution.
          </h3>
          <p className="mt-6 text-lg leading-8 text-[#1f3b1f] font-lora">
            Healing is no longer a miracle-it is a choice backed by science. Join hands with us to spread awareness, volunteer
            in our projects, or support patients who cannot afford treatment. Together, we can make the vision of a disease-free
            planet a living reality.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-r-[32px] border border-[#0d8b1f]/20 bg-[#0d8b1f] px-8 py-3 text-base font-semibold uppercase tracking-[0.3em] text-white shadow-[0_20px_36px_rgba(15,121,39,0.35)] transition hover:-translate-y-0.5 hover:bg-[#0b5f10]"
            >
              🌱 Volunteer Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-[#0d8b1f]/30 bg-white px-8 py-3 text-base font-semibold uppercase tracking-[0.25em] text-[#0d8b1f] shadow-[0_18px_32px_rgba(22,108,39,0.15)] transition hover:-translate-y-0.5 hover:bg-[#f8d547] hover:text-[#1b3c1e]"
            >
              💬 Share Your Story
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-[#f8d547]/40 bg-[#f8d547] px-8 py-3 text-base font-semibold uppercase tracking-[0.25em] text-[#1b3c1e] shadow-[0_18px_32px_rgba(146,108,5,0.35)] transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0d8b1f]"
            >
              💖 Support Save Medha Foundation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
