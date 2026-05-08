import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Heart } from "lucide-react";

interface LittleThingsProps {
  title: string;
  items: string[];
}

export function LittleThings({ title, items }: LittleThingsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 px-6 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          style={{ fontFamily: 'var(--font-serif)', fontSize: '2.75rem', color: '#5A4A42' }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 flex items-start gap-4 hover:shadow-xl transition-shadow"
            >
              <Heart className="w-6 h-6 flex-shrink-0 mt-1 fill-current" style={{ color: '#D4B5A0' }} />
              <p style={{ fontSize: '1.125rem', color: '#5A4A42', lineHeight: 1.6 }}>
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
