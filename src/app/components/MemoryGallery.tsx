import { AnimatePresence, motion } from "motion/react";
import { useInView } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MemoryGalleryProps {
  title: string;
  memories: { image: string; caption: string; position?: string }[];
}

export function MemoryGallery({ title, memories }: MemoryGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isInView || isPaused || memories.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % memories.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [isInView, isPaused, memories.length]);

  const goTo = (index: number) => setActiveIndex(index);
  const goPrev = () =>
    setActiveIndex(prev => (prev - 1 + memories.length) % memories.length);
  const goNext = () => setActiveIndex(prev => (prev + 1) % memories.length);

  const activeMemory = memories[activeIndex];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.1rem, 8vw, 2.75rem)",
            color: "#5A4A42",
          }}
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/3]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div
                  className="w-full h-full bg-cover"
                  style={{
                    backgroundImage: `url('${activeMemory.image}')`,
                    backgroundPosition: activeMemory.position ?? "center",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-7 px-4">
                  <p
                    className="text-white text-center"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.05rem, 4vw, 1.375rem)",
                    }}
                  >
                    {activeMemory.caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {memories.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#8B7355] shadow-lg flex items-center justify-center transition"
                  aria-label="Previous memory"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#8B7355] shadow-lg flex items-center justify-center transition"
                  aria-label="Next memory"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {memories.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {memories.map((memory, i) => (
                <button
                  type="button"
                  key={`${memory.caption}-${i}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-7 bg-[#8B7355]"
                      : "w-2.5 bg-[#D4B5A0]/70 hover:bg-[#D4B5A0]"
                  }`}
                  aria-label={`Go to memory ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
