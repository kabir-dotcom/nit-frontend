import React, { useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/photo/13.png";
import heroBackground from "../assets/photo/Rectangle 154.png";
import missionImage from "../assets/photo/Rectangle 153.png";
import beliefSecondaryImage from "../assets/photo/Rectangle 158.png";
import boosterImage from "../assets/photo/Rectangle 162.png";
import handPic from "../assets/photo/Rectangle 151.png";

const therapyTabs = [
  { label: "NATURAL CURE" },
  { label: "NON CHEMICAL THERAPY" },
  { label: "FOOD BASED HEALING" },
];

const Home = () => {
  const [activeTherapyTab, setActiveTherapyTab] = useState(therapyTabs[0].label);

  return (
    <div className="min-h-screen w-full bg-[#f4fbe7]">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b5f10]/95 via-[#11841b]/82 to-[#6bca60]/55 text-white">
        {/* Background Overlay Image */}
        <img
          src={heroBackground}
          alt="Leafy green backdrop"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-soft-light"
        />

        {/* Content Container */}
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col-reverse gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          {/* ---------- LEFT SIDE: Text ---------- */}
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/85">
              Rebuilding the Body's Healing Intelligence
            </p>

            <h1 className="mt-4 text-[3.2rem] lg:text-[4.2rem] font-limelight leading-tight font-normal text-white">
              Natural Immunotherapy
            </h1>

            <p className="mt-6 max-w-xl text-xl lg:text-2xl leading-snug text-white/90 font-lora">
              Rebuilding the body's healing intelligence naturally.
            </p>

            {/* --- Explore Button --- */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/diseases"
                className="inline-flex items-center gap-4 rounded-r-[32px] border border-white/20 bg-white px-8 py-3 text-base font-semibold uppercase tracking-[0.3em] text-green-700 shadow-[0_18px_36px_rgba(0,94,5,0.28)] transition hover:-translate-y-0.5 hover:bg-[#f8d547] hover:text-green-900 font-montserrat"
              >
                <span>Explore</span>
                <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-green-700 text-white shadow-inner shadow-green-900/50">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M7.5 4.5 12.5 10 7.5 15.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>

            {/* --- Therapy Tabs --- */}
            <div className="mt-14 w-full max-w-xl rounded-tl-[16px] bg-white shadow-[0_24px_46px_rgba(0,94,5,0.28)] ring-1 ring-black/5">
              <div className="grid gap-2 rounded-[34px] bg-white px-4 py-4 text-center sm:grid-cols-3">
                {therapyTabs.map((tab) => {
                  const isActive = tab.label === activeTherapyTab;
                  return (
                    <button
                      type="button"
                      onClick={() => setActiveTherapyTab(tab.label)}
                      aria-pressed={isActive}
                    key={tab.label}
                    className={[
                      "flex h-full items-center justify-center rounded-[26px] px-4 py-3 text-[0.76rem] font-medium uppercase tracking-[0.25em] font-montserrat transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-600",
                      isActive
                        ? "bg-gradient-to-r from-[#70dd67] to-[#006705] text-white shadow-lg shadow-green-600/40"
                        : "text-slate-900 hover:text-green-700",
                    ].join(" ")}
                  >
                    {tab.label}
                  </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ---------- RIGHT SIDE: Image ---------- */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative h-[22rem] w-[22rem] sm:h-[26rem] sm:w-[28rem] md:h-[30rem] md:w-[34rem] overflow-hidden  shadow-lg">
              <img
                src={missionImage}
                alt="Natural supplements on a table"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="therapies" className="bg-[#f2ffe3] py-20">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid items-center gap-12 rounded-[36px] bg-[#f6ffe9] p-8 shadow-[0_22px_48px_rgba(22,108,39,0.18)] lg:grid-cols-[1.05fr,0.95fr]">
            <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_18px_36px_rgba(22,108,39,0.18)]">
              <div className="absolute left-6 top-6 flex flex-col gap-1.5">
                <span className="h-1 w-10 rounded-full bg-[#0f8f28]" />
                <span className="h-1 w-7 rounded-full bg-[#0f8f28]" />
                <span className="h-1 w-5 rounded-full bg-[#0f8f28]" />
              </div>
              <img
                src={handPic}
                alt="Hands nurturing seedlings"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-6 text-primary-900">
              <div className="flex items-start gap-4">
                <h2 className="text-3xl font-semibold leading-snug text-[#0e4d1b] font-montserrat">
                  <span className="text-[#0d7f1f]">Healing Beyond Medicine</span>
                  <span className="text-[#17371e]">
                    {" "}
                    — Uniting Nature's Intelligence with Scientific Understanding.
                  </span>
                </h2>
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0d8b1f] text-white shadow-[0_10px_18px_rgba(15,121,39,0.3)]">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v9.5A2.5 2.5 0 0 0 4.5 18H8l4 3 4-3h3.5A2.5 2.5 0 0 0 22 15.5V6a2 2 0 0 0-2-2z" />
                  </svg>
                </span>
              </div>
              <div className="space-y-4 text-[1.05rem] leading-8 text-[#1f3b1f] font-lora">
                <p className="italic font-semibold text-[#0c5c18]">
                  When modern medicine says "no cure,"{" "}
                  <span className="font-bold not-italic text-[#0b4713]">
                    Nature whispers "try again."
                  </span>
                </p>
                <p>
                  At Natural Immunotherapy (NIT), we bring hope where conventional medicine gives up. Our therapies
                  rebuild the body's natural healing intelligence to cure critical diseases — without chemotherapy,
                  surgery, or radiation.
                </p>
                <p>
                  We have witnessed patients recover from cancer, kidney failure, heart disease, thalassemia, nerve
                  disorders, and spinal atrophy through our scientifically designed Natural Immunotherapy process.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center  bg-gradient-to-b from-[#76e16d] via-[#31a12d] to-[#0d6615] px-10 py-3 text-lg font-semibold text-white shadow-[0_16px_32px_rgba(20,110,33,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(20,110,33,0.45)] font-montserrat"
              >
                Our Mission
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7ffe8] py-20">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid items-center gap-12 rounded-[36px] bg-[#f2ffdb] p-8 pb-16 shadow-[0_20px_46px_rgba(17,109,36,0.18)] lg:grid-cols-[1.1fr,0.9fr] lg:p-12 lg:pb-20">
            <div className="space-y-6 text-[#1f3b1f]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0f8f28] text-white shadow-[0_12px_26px_rgba(17,109,36,0.35)]">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4a2 2 0 0 0-2 2v9.5A2.5 2.5 0 0 0 4.5 18H8l4 3 4-3h3.5A2.5 2.5 0 0 0 22 15.5V6a2 2 0 0 0-2-2z" />
                  </svg>
                </span>
                <h3 className="text-3xl font-semibold leading-snug text-[#0f3f19] sm:text-[2.2rem] font-montserrat">
                  <span className="text-[#0d7f1f]">We Believe Every Body Can Heal Itself</span>
                  <span className="text-[#17361d]">{' '}&mdash; If Guided Right.</span>
                </h3>
              </div>
              <div className="space-y-5 text-lg leading-8 text-[#22432a] font-lora">
                <p>
                  Your body is not broken &mdash; it is intelligent. At Natural Immunotherapy, we reactivate that intelligence
                  through nutrients, not chemicals. Our process focuses on restoring cellular balance and awakening
                  natural immunity to fight disease from within.
                </p>
                <p>
                  We treat not just symptoms, but the cause &mdash; giving patients a new life, naturally.
                </p>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute -right-6 top-6 hidden flex-col gap-1.5 lg:flex">
                <span className="h-1 w-12 rounded-full bg-[#0f8f28]" />
                <span className="h-1 w-9 rounded-full bg-[#0f8f28]" />
                <span className="h-1 w-7 rounded-full bg-[#0f8f28]" />
              </div>
              <div className="relative w-full max-w-[420px]">
                <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_18px_36px_rgba(17,109,36,0.22)]">
                  <img
                    src={beliefSecondaryImage}
                    alt="Guided natural healing"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-14 left-6 w-[220px] overflow-hidden rounded-[28px] border-4 border-[#f2ffdb] shadow-[0_18px_32px_rgba(17,109,36,0.25)]">
                  <img
                    src={boosterImage}
                    alt="Immune system support"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9f4] py-20">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-16 px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-10">
          <div className="relative flex-1 overflow-hidden rounded-[36px] bg-white shadow-[0_24px_52px_rgba(44,85,58,0.2)]">
            <img
              src={heroImage}
              alt="Herbal capsules with leaves"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 space-y-8 text-[#1c2d1f]">
            <div>
              <span className="inline-flex rounded-full bg-gradient-to-r from-[#0a6f1b] via-[#4ab33e] to-[#0a6f1b] px-6 py-2 text-base font-semibold uppercase tracking-[0.18em] font-montserrat text-white shadow-[0_16px_32px_rgba(20,110,33,0.35)]">
                Why People Choose NIT:
              </span>
              <p className="mt-4 text-xl font-medium text-[#3a4f3a] font-lora">
                Holistic recovery that feels personal.
              </p>
            </div>

            <ul className="space-y-4 text-lg leading-8 text-[#1e311f] font-lora">
              <li className="flex gap-4">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#dafbe2] text-[#0d8b1f] shadow-[0_10px_20px_rgba(23,94,36,0.2)]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <strong>100% Non-Conventional</strong> &mdash; No chemotherapy, no radiation, no surgery.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#dafbe2] text-[#0d8b1f] shadow-[0_10px_20px_rgba(23,94,36,0.2)]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <strong>Food &amp; Nutrient-Based Therapy</strong> using vitamins, minerals, and natural boosters.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#dafbe2] text-[#0d8b1f] shadow-[0_10px_20px_rgba(23,94,36,0.2)]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <strong>Real Recovery Stories</strong> from patients once declared &ldquo;untreatable.&rdquo;
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#dafbe2] text-[#0d8b1f] shadow-[0_10px_20px_rgba(23,94,36,0.2)]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <strong>The Future of Healing</strong> &mdash; backed by biological intelligence, not chemicals.
                </span>
              </li>
            </ul>

            <Link
              to="/diseases"
              className="inline-flex items-center gap-3 rounded-lg bg-[#f8d547] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#164c18] shadow-[0_16px_28px_rgba(146,108,5,0.25)] transition hover:bg-[#0d8b1f] hover:text-[#fffdfd] hover:-translate-y-0.5 hover:shadow-[0_18px_32px_rgba(146,108,5,0.35)] font-montserrat"
            >
              EXPLORE
              <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-[#0d8b1f] hover:bg-[#f8d547] text-white">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7.5 4.5 12.5 10 7.5 15.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[40px] bg-gradient-to-r from-[#0c4d1a] via-[#0b8d26] to-[#0c4d1a] shadow-[0_32px_60px_rgba(5,46,16,0.4)]">
          <div className="flex flex-col items-center gap-10 px-8 py-12 text-center text-white lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-[520px] space-y-4 font-lora text-lg leading-9">
              <p className="text-2xl font-semibold text-white/95">
                &ldquo;We don't treat diseases &mdash; we restore life.&rdquo;
              </p>
              <p className="text-white/85">
                Book a free health assessment and begin your natural recovery plan. Our specialists listen, map your immune terrain, and craft nutrient-driven protocols customized to your journey.
              </p>
            </div>
            <div className="relative flex w-full max-w-[360px] flex-col items-center">
              <div className="w-full rounded-full bg-white/20 p-1.5 shadow-[0_20px_36px_rgba(0,0,0,0.25)]">
                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-3 text-base font-semibold text-[#0d7f1f] transition hover:-translate-y-0.5 hover:bg-[#f9fff3] hover:text-[#0a4f15] font-montserrat"
                >
                  Book a Free Health Assessment
                  <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-[#0d8b1f] text-white">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7.5 4.5 12.5 10 7.5 15.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
