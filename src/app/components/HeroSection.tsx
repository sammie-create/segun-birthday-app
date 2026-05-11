import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface HeroSectionProps {
  onEnter: () => void;
}

const HERO_TITLE = "Hi my love…";
const HERO_TYPING_SPEED_MS = 95;
const HERO_REVEAL_DELAY_MS = 450;
const HERO_IMAGE_URL =
  "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/hero-1.jpg";
const HERO_BLUR_IMAGE_URL =
  "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/jpeg-optimizer_hero-blur.png";

export function HeroSection({ onEnter }: HeroSectionProps) {
  const [typedTitle, setTypedTitle] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showHeroActions, setShowHeroActions] = useState(false);
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);

  useEffect(() => {
    if (typedTitle.length >= HERO_TITLE.length) {
      setIsTypingComplete(true);
      const revealTimer = window.setTimeout(() => {
        setShowHeroActions(true);
      }, HERO_REVEAL_DELAY_MS);

      return () => window.clearTimeout(revealTimer);
    }

    const typingTimer = window.setTimeout(() => {
      setTypedTitle(HERO_TITLE.slice(0, typedTitle.length + 1));
    }, HERO_TYPING_SPEED_MS);

    return () => window.clearTimeout(typingTimer);
  }, [typedTitle]);

  useEffect(() => {
    const image = new Image();
    image.src = HERO_IMAGE_URL;

    const markLoaded = () => setIsHeroImageLoaded(true);
    image.addEventListener("load", markLoaded);
    image.addEventListener("error", markLoaded);

    return () => {
      image.removeEventListener("load", markLoaded);
      image.removeEventListener("error", markLoaded);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      <div
        className="absolute inset-0 bg-cover bg-[position:50%_32%] sm:bg-center"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(250, 247, 245, 0.04), rgba(139, 115, 85, 0.18)),
            linear-gradient(to bottom, rgba(232, 221, 211, 0.10), rgba(212, 181, 160, 0.26)),
            url('${HERO_BLUR_IMAGE_URL}')
          `,
        }}
      />

      <div
        className="absolute inset-0 bg-cover bg-[position:50%_32%] sm:bg-center transition-opacity duration-700"
        style={{
          opacity: isHeroImageLoaded ? 1 : 0,
          backgroundImage: `
            radial-gradient(circle at center, rgba(250, 247, 245, 0.04), rgba(139, 115, 85, 0.18)),
            linear-gradient(to bottom, rgba(232, 221, 211, 0.10), rgba(212, 181, 160, 0.26)),
            url('${HERO_IMAGE_URL}')
          `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="relative z-10 text-center px-3 sm:px-6 max-w-2xl"
      >
        <div className="absolute inset-0 -z-10 rounded-full bg-[#FAF7F5]/35 blur-3xl" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.35rem, 11vw, 4rem)",
            lineHeight: 1.2,
            color: "#5A4A42",
            textShadow: "0 2px 18px rgba(250, 247, 245, 0.85)",
          }}
        >
          {typedTitle}
          {!isTypingComplete && (
            <span
              className="ml-1 inline-block w-1 rounded-full animate-pulse align-[-0.08em]"
              style={{
                height: "0.78em",
                backgroundColor: "#D4B5A0",
              }}
            />
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={
            showHeroActions ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="mb-10 sm:mb-12 opacity-80"
          style={{
            fontSize: "clamp(1.05rem, 4vw, 1.375rem)",
            color: "#5A4A42",
            textShadow: "0 2px 14px rgba(250, 247, 245, 0.85)",
          }}
        >
          This is for you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            showHeroActions
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.9, y: 12 }
          }
          transition={{ duration: 0.75, delay: 0.85, ease: "easeOut" }}
          whileHover={{
            scale: 1.06,
            y: -3,
            boxShadow: "0 18px 42px rgba(139, 115, 85, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="px-7 sm:px-10 py-3.5 sm:py-4 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto border cursor-pointer"
          style={{
            color: "#8B7355",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(245,237,230,0.9))",
            borderColor: "rgba(139, 115, 85, 0.16)",
            boxShadow: "0 12px 30px rgba(139, 115, 85, 0.18)",
          }}
        >
          Come in
          <motion.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ rotate: -8, scale: 1.18 }}
            className="inline-flex"
          >
            <Heart className="w-5 h-5 fill-current" />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
}
