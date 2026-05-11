import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useIsMobile } from "./ui/use-mobile";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

interface LittleThingItem {
  text: string;
  mediaType?: "image" | "video";
  mediaUrl?: string;
  posterUrl?: string;
}

interface LittleThingsProps {
  title: string;
  items: LittleThingItem[];
}

export function LittleThings({ title, items }: LittleThingsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isMobile = useIsMobile();
  const [openPreviewIndex, setOpenPreviewIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 px-6 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.75rem",
            color: "#5A4A42",
          }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 flex items-start gap-4 hover:shadow-xl transition-shadow"
            >
              <Heart
                className="w-6 h-6 flex-shrink-0 mt-1 fill-current"
                style={{ color: "#D4B5A0" }}
              />
              <div className="flex-1">
                <p
                  style={{
                    fontSize: "1.125rem",
                    color: "#5A4A42",
                    lineHeight: 1.6,
                  }}
                >
                  {item.text}
                </p>

                {item.mediaUrl && (
                  <div className="mt-4">
                    {isMobile ? (
                      <Dialog
                        open={openPreviewIndex === i}
                        onOpenChange={open =>
                          setOpenPreviewIndex(open ? i : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="group w-8 h-8 rounded-full border border-[#D4B5A0]/60 text-[#FAF7F5] bg-[#8B7355] hover:bg-[#D4B5A0] hover:shadow-md transition duration-300 flex items-center justify-center cursor-pointer"
                            aria-label="Open media preview"
                          >
                            <Sparkles className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm rounded-2xl border-[#D4B5A0]/40 bg-[#FFFDFB] p-3">
                          <DialogTitle className="sr-only">
                            Media preview
                          </DialogTitle>
                          <div className="overflow-hidden rounded-xl bg-black/5 border border-[#8B7355]/10">
                            {item.mediaType === "video" ? (
                              <video
                                className="w-full h-auto"
                                controls
                                preload="metadata"
                                playsInline
                                poster={item.posterUrl}
                              >
                                <source src={item.mediaUrl} type="video/mp4" />
                                Your browser does not support video playback.
                              </video>
                            ) : (
                              <img
                                src={item.mediaUrl}
                                alt={`Preview for ${item.text}`}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                              />
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <HoverCard openDelay={120} closeDelay={120}>
                        <HoverCardTrigger asChild>
                          <button
                            type="button"
                            className="group w-8 h-8 rounded-full border border-[#D4B5A0]/60 text-[#FAF7F5] bg-[#8B7355] hover:bg-[#D4B5A0] hover:shadow-md transition duration-300 flex items-center justify-center cursor-pointer"
                            aria-label="Preview media"
                          >
                            <Sparkles className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent
                          className="w-[260px] sm:w-[300px] p-2 rounded-2xl border-[#D4B5A0]/40 bg-[#FFFDFB]/95 backdrop-blur-md"
                          sideOffset={10}
                        >
                          <div className="overflow-hidden rounded-xl bg-black/5 border border-[#8B7355]/10">
                            {item.mediaType === "video" ? (
                              <video
                                className="w-full h-auto"
                                preload="metadata"
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster={item.posterUrl}
                              >
                                <source src={item.mediaUrl} type="video/mp4" />
                                Your browser does not support video playback.
                              </video>
                            ) : (
                              <img
                                src={item.mediaUrl}
                                alt={`Preview for ${item.text}`}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                              />
                            )}
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
