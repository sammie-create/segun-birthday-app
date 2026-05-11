import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HeroSection } from "./components/HeroSection";
import { FloatingHearts } from "./components/FloatingHearts";
import { TextReveal } from "./components/TextReveal";
import { TypingEffect } from "./components/TypingEffect";
import { ImageGallerySection } from "./components/ImageGallerySection";
import { Timeline } from "./components/Timeline";
import { MemoryGallery } from "./components/MemoryGallery";
import { LoveLetter } from "./components/LoveLetter";
import { LittleThings } from "./components/LittleThings";
import { AudioPlayer } from "./components/AudioPlayer";
import { FinalSection } from "./components/FinalSection";
import { MusicControl } from "./components/MusicControl";
import { BalloonDrop } from "./components/BalloonDrop";

const BACKGROUND_AUDIO_URL =
  "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/Safire_Ray_-_I_love_you.mp3";
const VIDEO_MESSAGE_URL =
  "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/birthday-wish-video-1.mp4";
const VIDEO_POSTER_URL =
  "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/video-poster.jpg";
const FAMILY_MESSAGE_VIDEO_URL =
  "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/household-video.mp4";
const FAMILY_MESSAGE_POSTER_URL =
  "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/jpeg-optimizer_adebayo-household.png";

const AUTO_SCROLL_DELAY_MS = 2200;
const AUTO_SCROLL_STEP_PX = 1;
const AUTO_SCROLL_INTERVAL_MS = 22;

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showRevealWash, setShowRevealWash] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const autoScrollTimerRef = useRef<number | null>(null);
  const autoScrollDelayRef = useRef<number | null>(null);
  const hasUserInterruptedScrollRef = useRef(false);

  const clearAutoScroll = () => {
    if (autoScrollTimerRef.current !== null) {
      window.clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    if (autoScrollDelayRef.current !== null) {
      window.clearTimeout(autoScrollDelayRef.current);
      autoScrollDelayRef.current = null;
    }
  };

  const stopAutoScrollOnUserAction = () => {
    hasUserInterruptedScrollRef.current = true;
    clearAutoScroll();
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    backgroundAudioRef.current = new Audio(BACKGROUND_AUDIO_URL);
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.loop = true;
      backgroundAudioRef.current.volume = 0.6;
      backgroundAudioRef.current.muted = isMuted;
    }

    return () => {
      clearAutoScroll();
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!showContent) return;

    const handler = () => stopAutoScrollOnUserAction();
    window.addEventListener("wheel", handler, { passive: true });
    window.addEventListener("touchstart", handler, { passive: true });
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [showContent]);

  useEffect(() => {
    if (!showBalloons) return;

    const timer = window.setTimeout(() => {
      setShowBalloons(false);
    }, 5600);

    return () => window.clearTimeout(timer);
  }, [showBalloons]);

  useEffect(() => {
    if (!showRevealWash) return;

    const timer = window.setTimeout(() => {
      setShowRevealWash(false);
    }, 1100);

    return () => window.clearTimeout(timer);
  }, [showRevealWash]);

  useEffect(() => {
    if (!backgroundAudioRef.current) return;
    backgroundAudioRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (!showContent) return;

    hasUserInterruptedScrollRef.current = false;
    clearAutoScroll();

    autoScrollDelayRef.current = window.setTimeout(() => {
      if (hasUserInterruptedScrollRef.current) return;

      autoScrollTimerRef.current = window.setInterval(() => {
        const reachedBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4;

        if (hasUserInterruptedScrollRef.current || reachedBottom) {
          clearAutoScroll();
          return;
        }

        window.scrollBy({
          top: AUTO_SCROLL_STEP_PX,
          left: 0,
          behavior: "auto",
        });
      }, AUTO_SCROLL_INTERVAL_MS);
    }, AUTO_SCROLL_DELAY_MS);

    return () => clearAutoScroll();
  }, [showContent]);

  const handleEnter = () => {
    setShowRevealWash(true);
    setShowContent(true);
    setShowBalloons(true);

    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.play().catch(() => {
        // Ignore autoplay errors; user can interact with MusicControl to resume.
      });
    }
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#FAF7F5" }}>
      <FloatingHearts />
      <MusicControl
        isMuted={isMuted}
        onToggleMute={() => {
          setIsMuted(prev => {
            const next = !prev;
            if (backgroundAudioRef.current) {
              backgroundAudioRef.current.muted = next;
              if (!next) {
                backgroundAudioRef.current.play().catch(() => {
                  // Playback may still require user gesture depending on browser policy.
                });
              }
            }
            return next;
          });
        }}
      />
      {showBalloons && <BalloonDrop count={28} />}

      <AnimatePresence>
        {showRevealWash && (
          <motion.div
            key="reveal-wash"
            className="pointer-events-none fixed inset-0 z-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(250,247,245,0.95), rgba(232,221,211,0.82), rgba(250,247,245,0.92))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {!showContent ? (
          <motion.div
            key="hero"
            className="relative z-20"
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -12 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <HeroSection onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            className="relative z-10"
            initial={{ opacity: 0, y: 28, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 }}
          >
            <TextReveal
              lines={[
                "It's your birthday!",
                "Thank you for being a blessing to me and to everyone around you.",
                "You light up any room you enter.",
                "You are strength… and softness.",
              ]}
            />

            <div className="py-16 px-6 text-center max-w-3xl mx-auto">
              <TypingEffect
                text="Today, I celebrate the man who calms my soul and still makes every part of me crave him."
                delay={500}
              />
            </div>

            <ImageGallerySection
              title="You as a Father"
              images={[
                {
                  url: "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/with-the-boys-1.jpg",
                  caption: "The gentlest strength",
                  note: "You make strength look soft, safe, and full of love.",
                },
                {
                  url: "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/with-boys-2.jpeg",
                  caption: "Building dreams together",
                  note: "The way you show up for our boys is something I will never stop admiring.",
                },
                {
                  url: "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/with-the-boys-3.jpg",
                  caption: "Pure joy",
                  note: "Their joy around you says everything about the kind of father you are.",
                },
              ]}
              paragraphs={[
                "Watching you love our boys…",
                "has been one of the most beautiful things I've ever experienced.",
                "You're not just a father…",
                "you're my safe place.",
              ]}
            />

            <Timeline
              title="Our Story"
              items={[
                {
                  image:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/the-beginning.JPG",
                  caption: "The beginning…",
                },
                {
                  image:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/still-choose-you.jpg",
                  caption:
                    "Somewhere between conversations… I still choose you.",
                },
                {
                  image:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/built-something-beautiful.jpg",
                  caption: "And we built something beautiful.",
                },
              ]}
            />

            <MemoryGallery
              title="Memory Gallery"
              memories={[
                {
                  image:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/memories-5.jpg",
                  caption: "My favorite smile",
                  position: "center 15%",
                },
                {
                  image:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/memories-3.PNG",
                  caption: "Us, being us",
                  position: "center 60%",
                },
                {
                  image:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/memories-2.JPG",
                  caption: "This moment meant everything",
                  position: "65% center",
                },
                {
                  image:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/memories-6.PNG",
                  caption: "Just the two of us",
                  position: "center 35%",
                },
                {
                  image:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/memories-4.jpg",
                  caption: "My heart",
                  position: "center 15%",
                },
                {
                  image:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/memories-1.JPG",
                  caption: "Forever grateful",
                  position: "left center",
                },
              ]}
            />

            <LoveLetter
              title="To my sweet birthday guy"
              signature="Forever yours, always."
              paragraphs={[
                "My love,",
                "You are one of the sweetest and most selfless people I know. Life with you is easy in the best way. You’re intelligent, fun to be with, and you have this quiet way of making everything feel lighter just by being present.",
                "I admire how you think, how you love, and how you show up for the people you care about without making a noise about it. I am so proud of you ,of the man you are, and the life you continue to build for us.",
                "I pray that you grow stronger, healthier, and more fulfilled with each passing year. May peace follow you in every season, and may joy remain steady in your heart. May everything you touch flourish, and may your life continue to be marked by favour, love, and expansion.",
              ]}
            />

            <LittleThings
              title="Little Things I Love About You"
              items={[
                {
                  text: "Your smart brain😁 my 10X guy",
                  mediaType: "image",
                  mediaUrl:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/10x-guy.JPG",
                },
                {
                  text: "Your yeye dance move😂",
                  mediaType: "video",
                  mediaUrl:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/dance-moves.mp4",
                  posterUrl:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/dance-moves-poster.png",
                },
                {
                  text: "Your handsome face and cute smile",
                  mediaType: "image",
                  mediaUrl:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/jpeg-optimizer_IMG_5534.jpg",
                },
                {
                  text: "How you show up, even while tired",
                  mediaType: "image",
                  mediaUrl:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/with-the-boys-1.jpg",
                },
                {
                  text: "The way you love me and our boys",
                  mediaType: "image",
                  mediaUrl:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/with-boys-2.jpeg",
                },
                {
                  text: "How safe you make our world feel",
                  mediaType: "image",
                  mediaUrl:
                    "https://segun-birthday-app-files.s3.eu-north-1.amazonaws.com/jpeg-optimizer_IMG_4056.jpg",
                },
              ]}
            />

            <AudioPlayer
              title="I wanted you to hear this from me…"
              videoUrl={VIDEO_MESSAGE_URL}
              posterUrl={VIDEO_POSTER_URL}
            />

            <AudioPlayer
              title="A special message from Ope, Dayo & Joshua"
              videoUrl={FAMILY_MESSAGE_VIDEO_URL}
              posterUrl={FAMILY_MESSAGE_POSTER_URL}
            />

            <FinalSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
