import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface AudioPlayerProps {
  title: string;
  videoUrl?: string;
  posterUrl?: string;
}

export function AudioPlayer({ title, videoUrl, posterUrl }: AudioPlayerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center"
        >
          <p
            className="mb-8"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.35rem, 5vw, 1.75rem)",
              color: "#5A4A42",
            }}
          >
            {title}
          </p>

          {videoUrl ? (
            <div className="space-y-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#8B7355]/10 bg-black/5">
                <video
                  className="w-full h-auto"
                  controls
                  preload="metadata"
                  playsInline
                  poster={posterUrl}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>

              <p
                className="opacity-70"
                style={{ fontSize: "0.9rem", color: "#5A4A42" }}
              >
                Tap play to watch your birthday message.
              </p>
            </div>
          ) : (
            <p
              className="opacity-60"
              style={{ fontSize: "0.875rem", color: "#5A4A42" }}
            >
              Add your S3 video URL to show the birthday message here.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
