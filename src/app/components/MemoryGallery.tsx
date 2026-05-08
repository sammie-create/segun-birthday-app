import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface MemoryGalleryProps {
  title: string;
  memories: { image: string; caption: string }[];
}

export function MemoryGallery({ title, memories }: MemoryGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 px-6 bg-white/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          style={{ fontFamily: 'var(--font-serif)', fontSize: '2.75rem', color: '#5A4A42' }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl shadow-lg aspect-square"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${memory.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                <p className="text-white text-center px-6" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.375rem' }}>
                  {memory.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
