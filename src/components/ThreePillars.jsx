import { motion } from "framer-motion";

const cellularImg = new URL("../assets/photo/1._Cellular Intelligence.png", import.meta.url).href;
const micronutrientImg = new URL("../assets/photo/2._Micronutrient Therapy.png", import.meta.url).href;
const detoxImg = new URL("../assets/photo/3._Toxin Detoxification.png", import.meta.url).href;

export default function ThreePillars() {
  const pillars = [
    {
      title: "Cellular Intelligence",
      desc: "Your cells are intelligent—they detect damage, communicate, and repair naturally when given the right nutrients.",
      img: cellularImg,
    },
    {
      title: "Micronutrient Therapy",
      desc: "77 minerals and 13 vitamins empower cells to produce energy, repair DNA, and restore organ function.",
      img: micronutrientImg,
    },
    {
      title: "Toxin Detoxification",
      desc: "Removing accumulated toxins revives liver function, improves blood flow, and enables natural recovery.",
      img: detoxImg,
    },
    
  ];

  return (
    <section className="py-20 bg-[#f2ffe3] text-center">
      <h2 className="inline-flex rounded-full bg-gradient-to-r from-[#0a6f1b] via-[#4ab33e] to-[#0a6f1b] px-16 py-3 mb-16 text-lg md:text-xl font-semibold uppercase tracking-[0.18em] font-montserrat text-white shadow-[0_16px_32px_rgba(20,110,33,0.35)]">
        The 3 Pillars of Natural Immunotherapy
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-[1180px] mx-auto px-6">
        {pillars.map((pillar) => (
          <motion.div
            key={pillar.title}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="group relative w-full h-80 cursor-pointer [perspective:1200px]"
          >
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front (Image) */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={pillar.img}
                  alt={pillar.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Back (Text) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#f7fdf4] rounded-2xl shadow-lg p-6 [transform:rotateY(180deg)]"
                style={{ backfaceVisibility: "hidden" }}
              >
                <h3 className="text-2xl font-semibold text-[#006705] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-sm">{pillar.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
