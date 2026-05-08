import { motion } from "motion/react";
import { useMemo } from "react";

interface BalloonDropProps {
  count?: number;
}

interface BalloonSpec {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  color: string;
}

const BALLOON_COLORS = ["#D4B5A0", "#E8DDD3", "#F5EDE6", "#CFA18D", "#EAC7B8"];

export function BalloonDrop({ count = 24 }: BalloonDropProps) {
  const balloons = useMemo<BalloonSpec[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 28 + Math.random() * 44,
        duration: 4 + Math.random() * 0.5,
        delay: Math.random() * 2,
        drift: -40 + Math.random() * 80,
        color:
          BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {balloons.map(balloon => (
        <motion.div
          key={balloon.id}
          initial={{ y: "-15vh", x: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, balloon.drift],
            rotate: [-8, 8, -6, 6],
            opacity: [0, 1, 1, 0.9, 0],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            ease: "easeInOut",
          }}
          className="absolute top-0"
          style={{ left: `${balloon.left}%` }}
        >
          <div
            style={{
              width: `${balloon.size}px`,
              height: `${balloon.size * 1.2}px`,
              background: `radial-gradient(circle at 30% 30%, #ffffff88, ${balloon.color})`,
              borderRadius: "55% 55% 50% 50%",
              boxShadow: "0 8px 20px rgba(90, 74, 66, 0.15)",
            }}
          />
          <div
            style={{
              width: "2px",
              height: `${balloon.size * 0.7}px`,
              margin: "0 auto",
              background: "rgba(90, 74, 66, 0.25)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
