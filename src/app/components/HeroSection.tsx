import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface HeroSectionProps {
  onEnter: () => void;
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(250, 247, 245, 0.3), rgba(250, 247, 245, 0.5)), url('https://images.unsplash.com/photo-1763713512973-4be054e5400d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')`,
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4"
          style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', lineHeight: 1.2, color: '#5A4A42' }}
        >
          Hi my love…
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-12 opacity-80"
          style={{ fontSize: '1.375rem', color: '#5A4A42' }}
        >
          This is for you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="px-10 py-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
          style={{ color: '#8B7355' }}
        >
          Come in
          <Heart className="w-5 h-5 fill-current" />
        </motion.button>
      </div>
    </section>
  );
}
