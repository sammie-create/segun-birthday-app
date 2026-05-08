import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Heart } from "lucide-react";

export function FinalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
          style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#5A4A42', lineHeight: 1.6 }}
        >
          In this life… and every other one
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
          style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#5A4A42', lineHeight: 1.6 }}
        >
          I will always choose you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
          style={{ background: 'linear-gradient(135deg, #D4B5A0, #8B7355)', color: 'white', fontSize: '1.125rem' }}
        >
          Happy Birthday, my love
          <Heart className="w-6 h-6 fill-current" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 2 }}
          className="mt-24 opacity-40"
          style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#5A4A42' }}
        >
          One more thing… I love you more than words will ever hold.
        </motion.p>
      </div>
    </section>
  );
}
