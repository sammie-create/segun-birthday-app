import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface TypingEffectProps {
  text: string;
  delay?: number;
}

const BASE_TYPING_SPEED = 56;
const PUNCTUATION_PAUSE: Record<string, number> = {
  ",": 120,
  ".": 210,
  "!": 190,
  "?": 210,
  ":": 160,
  ";": 160,
  "…": 240,
};

export function TypingEffect({ text, delay = 0 }: TypingEffectProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (!isInView) return;

    if (currentIndex >= text.length) {
      setIsComplete(true);
      return;
    }

    const previousCharacter = text[currentIndex - 1];
    const punctuationPause = previousCharacter
      ? (PUNCTUATION_PAUSE[previousCharacter] ?? 0)
      : 0;
    const timeoutDuration =
      currentIndex === 0 ? delay : BASE_TYPING_SPEED + punctuationPause;

    const timeout = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [currentIndex, isInView, text, delay]);

  return (
    <div ref={ref} className="min-h-[3rem]">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isComplete ? 1 : 0.995,
          filter: isComplete ? "blur(0px)" : "blur(0.15px)",
        }}
        transition={{ duration: isComplete ? 0.45 : 0.28, ease: "easeOut" }}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.5rem",
          color: "#5A4A42",
          lineHeight: 1.6,
          letterSpacing: "0.01em",
        }}
      >
        {text.slice(0, currentIndex)}
        {currentIndex < text.length && (
          <span
            className="inline-block w-0.5 h-6 ml-1 animate-pulse rounded-full"
            style={{ backgroundColor: "#D4B5A0" }}
          />
        )}
      </motion.p>
    </div>
  );
}
