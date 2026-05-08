import { useState, useEffect } from "react";
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

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showRevealWash, setShowRevealWash] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

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

  const handleEnter = () => {
    setShowRevealWash(true);
    setShowContent(true);
    setShowBalloons(true);
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#FAF7F5" }}>
      <FloatingHearts />
      <MusicControl />
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
                  url: "https://images.unsplash.com/photo-1775725173215-4456488c961f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  caption: "The gentlest strength",
                  note: "You make strength look soft, safe, and full of love.",
                },
                {
                  url: "https://images.unsplash.com/photo-1758687126165-15540f06288b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  caption: "Building dreams together",
                  note: "The way you show up for our boys is something I will never stop admiring.",
                },
                {
                  url: "https://images.unsplash.com/photo-1647125529760-a17654ff8b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
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
                    "https://images.unsplash.com/photo-1691997378283-130832ca4f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                  caption: "The beginning…",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1570648595508-cbc7aef77747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                  caption: "Somewhere between conversations… I chose you.",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1560439972-1af698047fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                  caption: "And we built something beautiful.",
                },
              ]}
            />

            <MemoryGallery
              title="Memory Gallery"
              memories={[
                {
                  image:
                    "https://images.unsplash.com/photo-1763713512973-4be054e5400d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  caption: "My favorite smile",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1587645909095-9697704e5604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  caption: "Us, being us",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1663755118007-74429849d9c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  caption: "This moment meant everything",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1749831238693-07bf9bb43303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  caption: "Just the two of us",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1522808632297-5525cbe03666?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  caption: "My heart",
                },
                {
                  image:
                    "https://images.unsplash.com/photo-1663755076465-02ffe836e15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                  caption: "Forever grateful",
                },
              ]}
            />

            <LoveLetter
              title="To my sweet birthday guy"
              signature="Forever yours, always."
              paragraphs={[
                "My dearest, words can never fully hold what I feel for you, but today I want to try. Your life is a gift, and I'm so grateful I get to love you.",
                "You've shown me what home feels like—not a place, but a person. Watching you love our boys and lead our family with grace, strength, and tenderness fills my heart every day.",
                "Thank you for choosing me and the boys, for showing up, and for making our world feel safe. Happy birthday, my love. You make everything better just by being in it.",
              ]}
            />

            <LittleThings
              title="Little Things I Love About You"
              items={[
                "Your smart brain😁 my 10X guy",
                "Your yeye dance move😂",
                "Your handsome face and cute smile",
                "How you show up, even when you're tired",
                "The way you love me and our boys",
                "How safe you make our world feel",
              ]}
            />

            <AudioPlayer title="I wanted you to hear this from me…" />

            <FinalSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
