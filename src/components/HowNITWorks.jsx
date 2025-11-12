import { motion } from "framer-motion";
import cellStage from "../assets/photo/cell.png";
import toxinStage from "../assets/photo/toxin.png";
import detoxStage from "../assets/photo/detox.png";
import repairStage from "../assets/photo/repair.png";
import recoveryStage from "../assets/photo/recovery.png";

export default function HowNITWorks() {
  const stages = [
    {
      title: "Cell",
      img: cellStage,
      desc: "Healthy cells form the foundation of life. They sense, communicate, and repair naturally."
    },
    {
      title: "Toxin",
      img: toxinStage,
      desc: "Toxins enter your body through food, air, and stress—weakening cellular communication."
    },
    {
      title: "Detox",
      img: detoxStage,
      desc: "Through detoxification, your liver and lymph system flush out accumulated toxins."
    },
    {
      title: "Repair",
      img: repairStage,
      desc: "Micronutrients empower your cells to rebuild tissue and restore normal DNA structure."
    },
    {
      title: "Recovery",
      img: recoveryStage,
      desc: "Once detox and repair are complete, natural immunity restores balance and vitality."
    }
  ];

  return (
    <section className="bg-[#f2ffe3] py-20">
      {/* Title */}
      <div className="flex justify-center mb-16">
        <h2 className="inline-flex rounded-full bg-gradient-to-r from-[#0a6f1b] via-[#4ab33e] to-[#0a6f1b] px-24 py-3 text-lg md:text-xl font-semibold uppercase tracking-[0.18em] font-montserrat text-white shadow-[0_16px_32px_rgba(20,110,33,0.35)]">
          How NIT Works in Your Body
        </h2>
      </div>

      {/* Stages */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-6">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 100 }}     // 👈 starts from bottom
            whileInView={{ opacity: 1, y: 0 }}   // 👈 rises up smoothly
            transition={{ delay: i * 0.3, duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center text-center max-w-[220px] bg-white rounded-3xl shadow-[0_14px_32px_rgba(8,63,18,0.15)] p-6 min-h-[360px]"
          >
            {/* Image */}
            <motion.img
              src={stage.img}
              alt={stage.title}
              className="w-32 h-32 rounded-full object-cover shadow-lg mb-5 border-[5px] border-[#74C425]"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            />

            {/* Label */}
            <h3 className="text-xl font-semibold text-[#006705] mb-2">
              {stage.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {stage.desc}
            </p>

            {/* Arrow between steps */}
            {i < stages.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.3 + 0.2 }}
                viewport={{ once: true }}
                className="text-3xl text-gray-400 mt-3"
              >
                ➜
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
