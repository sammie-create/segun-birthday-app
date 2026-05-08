import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { useState } from "react";

interface ImageGallerySectionProps {
  title: string;
  subtitle?: string;
  images: { url: string; caption: string; note?: string }[];
  paragraphs: string[];
}

export function ImageGallerySection({
  title,
  subtitle,
  images,
  paragraphs,
}: ImageGallerySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const flipTimeoutRef = useRef<number | null>(null);

  const clearFlipTimeout = () => {
    if (flipTimeoutRef.current !== null) {
      window.clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    clearFlipTimeout();
    flipTimeoutRef.current = window.setTimeout(() => {
      setFlippedIndex(index);
    }, 300);
  };

  const handleMouseLeave = (index: number) => {
    clearFlipTimeout();
    setHoveredIndex(prev => (prev === index ? null : prev));
    setFlippedIndex(prev => (prev === index ? null : prev));
  };

  const getNote = (image: { caption: string; note?: string }) =>
    image.note ??
    `Every time I see this, I remember how deeply ${image.caption.toLowerCase()} reflects your love.`;

  return (
    <section ref={ref} className="py-24 px-6 bg-white/50">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.75rem",
            color: "#5A4A42",
          }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
            style={{ fontSize: "1.125rem", color: "#5A4A42" }}
          >
            {subtitle}
          </motion.p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {images.map((image, i) => {
            const isHovered = hoveredIndex === i;
            const isFlipped = flippedIndex === i || tappedIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
                className="relative rounded-3xl shadow-lg aspect-[4/5] cursor-pointer"
                style={{ perspective: "1200px" }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                onClick={() => setTappedIndex(prev => (prev === i ? null : i))}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setTappedIndex(prev => (prev === i ? null : i));
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Flip card for ${image.caption}`}
                aria-pressed={isFlipped}
              >
                <div
                  className="relative w-full h-full rounded-3xl"
                  style={{
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition:
                      "transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
                    willChange: "transform",
                  }}
                >
                  <div
                    className="absolute inset-0 overflow-hidden rounded-3xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(0deg) translateZ(1px)",
                    }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${image.url}')`,
                        transform:
                          isHovered || isFlipped ? "scale(1.1)" : "scale(1)",
                        transition:
                          "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500"
                      style={{
                        opacity: isFlipped ? 0 : isHovered ? 1 : 0.72,
                      }}
                    >
                      <p
                        className="absolute bottom-6 left-6 right-6 text-white text-center"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.25rem",
                        }}
                      >
                        {image.caption}
                      </p>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 rounded-3xl flex items-center justify-center p-6"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg) translateZ(1px)",
                      background:
                        "linear-gradient(145deg, rgba(250,247,245,0.98), rgba(232,221,211,0.95))",
                    }}
                  >
                    <p
                      className="text-center"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.15rem",
                        color: "#5A4A42",
                        lineHeight: 1.75,
                      }}
                    >
                      {getNote(image)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto space-y-4 text-center">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1 + i * 0.2 }}
              style={{
                fontSize: "1.125rem",
                color: "#5A4A42",
                lineHeight: 1.8,
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
