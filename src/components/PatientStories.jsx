import React, { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";

const patientStories = [
  {
    id: 1,
    title: "Discussion with Tanjila after full cure from Blood Cancer",
    youtubeUrl: "https://youtu.be/BvBIVuhY3uc?si=s3gDfzzD42Qia1Vg",
    duration: "05:12",
  },
  {
    id: 2,
    title: "After defeating cancer, Saddam is now healthy and living a normal life",
    youtubeUrl: "https://youtu.be/hO8hh1-81rk?si=KnymLfogHJlEm0Pj",
    duration: "03:45",
  },
  {
    id: 3,
    title: "A real success story of Blood cancer patient, rejected from Mumbai Tata Cancer Hospital",
    youtubeUrl: "https://youtu.be/447i_eSRkmM?si=a4A3Dp7QEpX6kuud",
    duration: "04:10",
  },
  {
    id: 4,
    title: "After defeating cancer, Mainul is now healthy and living a normal life",
    youtubeUrl: "https://youtu.be/ld62F0ZhwY0?si=H3PqIt922Bx1pmAT",
    duration: "02:58",
  },
];

const extractVideoId = (input = "") => {
  if (!input) return null;

  const decoded = decodeURIComponent(input.trim());
  const directMatch =
    decoded.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/|embed\/)|youtu\.be\/)([\w-]{11})/
    ) || decoded.match(/^[\w-]{11}$/);

  if (directMatch?.[1]) return directMatch[1];

  try {
    const yt = new URL(decoded);
    if (yt.hostname.includes("youtu.be")) {
      return yt.pathname.replace("/", "").split("?")[0];
    }
    return yt.searchParams.get("v");
  } catch {
    return null;
  }
};

const toEmbedUrl = (input = "") => {
  const videoId = extractVideoId(input);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : null;
};

const toThumbnailUrl = (input = "") => {
  const videoId = extractVideoId(input);
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "https://img.youtube.com/vi/default/hqdefault.jpg";
};

const PatientStories = () => {
  const scrollerRef = useRef(null);
  const [activeStoryId, setActiveStoryId] = useState(patientStories[0].id);
  const [openVideo, setOpenVideo] = useState(null);

  const activeStory = useMemo(
    () => patientStories.find((story) => story.id === activeStoryId),
    [activeStoryId]
  );

  const handleScroll = (direction) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({
      left: direction * 280,
      behavior: "smooth",
    });
  };

  const openStoryModal = (story) => {
    setActiveStoryId(story.id);
    setOpenVideo(toEmbedUrl(story.youtubeUrl));
  };

  const closeModal = () => setOpenVideo(null);

  return (
    <section className="relative w-full py-16 bg-[#f0ffe8] text-center">
      <div className="flex justify-center mb-10">
        <h2 className="inline-flex rounded-full bg-gradient-to-r from-[#0a6f1b] via-[#4ab33e] to-[#0a6f1b] px-16 py-3 text-lg md:text-xl font-semibold uppercase tracking-[0.18em] font-montserrat text-white shadow-[0_16px_32px_rgba(20,110,33,0.35)]">
          PATIENT SUCCESS STORY
        </h2>
      </div>

      <button
        type="button"
        onClick={() => handleScroll(-1)}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#0d8b1f] text-[#0d8b1f] items-center justify-center shadow-md hover:bg-[#f3ffeb]"
        aria-label="Scroll stories left"
      >
        <ArrowLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => handleScroll(1)}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#0d8b1f] text-[#0d8b1f] items-center justify-center shadow-md hover:bg-[#f3ffeb]"
        aria-label="Scroll stories right"
      >
        <ArrowRight size={22} />
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-6 sm:px-10 mx-auto max-w-[1180px] justify-center"
      >
        {patientStories.map((story) => {
          const isActive = story.id === activeStoryId;
          return (
            <button
              key={story.id}
              type="button"
              onClick={() => openStoryModal(story)}
              className="flex-shrink-0 w-[260px] snap-center flex flex-col text-left group focus:outline-none"
            >
              <div className="relative bg-gray-200 rounded-2xl overflow-hidden aspect-video shadow-lg">
                <img
                  src={toThumbnailUrl(story.youtubeUrl)}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/45">
                  <div className="w-12 h-12 bg-[#e02424] rounded-full flex items-center justify-center shadow-lg">
                    <Play className="text-white ml-1" size={28} />
                  </div>
                </div>
                {story.duration && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {story.duration}
                  </span>
                )}
              </div>
              <div
                className={`mt-3 ${
                  isActive
                    ? "bg-[#0d8b1f] text-white"
                    : "bg-[#f8d547] text-[#1b3c1e]"
                } text-center py-3 rounded-lg font-semibold text-sm px-3 min-h-[64px] flex items-center justify-center transition`}
              >
                {story.title}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <a
          href="https://youtube.com/@savemedhafoundation7959?si=SDwe2qDS2enc0q-l"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-lg bg-[#f8d547] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#164c18] shadow-[0_16px_28px_rgba(146,108,5,0.25)] transition hover:bg-[#0d8b1f] hover:text-[#fffdfd] hover:-translate-y-0.5 hover:shadow-[0_18px_32px_rgba(146,108,5,0.35)] font-montserrat"
        >
          Watch More Success Stories
          <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-[#0d8b1f] hover:bg-[#f8d547] text-white">
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7.5 4.5 12.5 10 7.5 15.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>

      {openVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-[#0a6f1b] flex items-center justify-center shadow-lg hover:bg-white"
              onClick={closeModal}
              aria-label="Close video"
            >
              <X size={22} />
            </button>

            <div className="w-full h-0 pb-[56.25%] relative bg-black">
              <iframe
                key={openVideo}
                src={openVideo}
                title={activeStory?.title || "Patient success story"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-none"
              />
            </div>

            {activeStory && (
              <div className="px-6 py-4 text-left bg-white">
                <p className="text-lg font-semibold text-[#0a6f1b]">
                  {activeStory.title}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PatientStories;
