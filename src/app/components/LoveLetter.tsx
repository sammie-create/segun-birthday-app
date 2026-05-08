import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Heart } from "lucide-react";

interface LoveLetterProps {
  title: string;
  paragraphs: string[];
  signature?: string;
}

export function LoveLetter({ title, paragraphs, signature }: LoveLetterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-white/75 backdrop-blur-sm rounded-3xl shadow-xl p-12 border border-[#8B7355]/10"
        >
          <div className="relative mb-8 text-center">
            <Heart
              className="absolute right-[14%] top-[52%] z-0 h-16 w-16 -translate-y-1/2 rotate-[-12deg] fill-current pointer-events-none"
              style={{ color: "#8B7355", opacity: 0.12 }}
            />

            <h2
              className="relative z-10 italic"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.25rem",
                color: "#5A4A42",
              }}
            >
              {title}
            </h2>
          </div>

          <div className="space-y-7">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
                style={{
                  fontSize: "1.125rem",
                  color: "#6E5F56",
                  lineHeight: 1.9,
                }}
              >
                {paragraph}
              </motion.p>
            ))}

            {signature && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + paragraphs.length * 0.2,
                }}
                className="mt-10 italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "#8B7355",
                  lineHeight: 1.6,
                }}
              >
                {signature}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
