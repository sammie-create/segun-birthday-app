import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function FloatingHearts() {
  const hearts = Array.from({ length: 8 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          <Heart className="w-6 h-6" style={{ color: '#D4B5A0' }} />
        </motion.div>
      ))}
    </div>
  );
}
