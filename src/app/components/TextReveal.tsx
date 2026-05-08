import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface TextRevealProps {
  lines: string[];
}

export function TextReveal({ lines }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: i * 0.3 }}
            style={{
              fontFamily: i === 0 ? 'var(--font-serif)' : 'var(--font-sans)',
              fontSize: i === 0 ? '2.5rem' : '1.25rem',
              color: '#5A4A42',
              lineHeight: 1.6,
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
