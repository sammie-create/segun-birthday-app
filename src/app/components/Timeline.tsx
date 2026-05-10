import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface TimelineItem {
  image: string;
  caption: string;
}

interface TimelineProps {
  title: string;
  items: TimelineItem[];
}

export function Timeline({ title, items }: TimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
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

        <div className="space-y-12 sm:space-y-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: i % 2 === 0 ? -50 : 50 }
              }
              transition={{ duration: 0.8, delay: i * 0.3 }}
              className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 w-full">
                <div className="aspect-[3.5/4.5] rounded-3xl overflow-hidden shadow-xl bg-[#F5EDE6] flex items-center justify-center max-w-sm mx-auto md:max-w-none">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.3rem, 5vw, 1.75rem)",
                    color: "#5A4A42",
                    lineHeight: 1.6,
                  }}
                >
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
