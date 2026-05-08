import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  title: string;
}

export function AudioPlayer({ title }: AudioPlayerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center"
        >
          <p className="mb-8" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#5A4A42' }}>
            {title}
          </p>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #D4B5A0, #8B7355)' }}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white fill-current" />
            ) : (
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            )}
          </button>

          <p className="mt-6 opacity-60" style={{ fontSize: '0.875rem', color: '#5A4A42' }}>
            Voice note placeholder
          </p>
        </motion.div>
      </div>
    </section>
  );
}
