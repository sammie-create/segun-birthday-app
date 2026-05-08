import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";

export function MusicControl() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-xl backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
      style={{ background: 'rgba(255, 255, 255, 0.9)' }}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6" style={{ color: '#8B7355' }} />
      ) : (
        <Volume2 className="w-6 h-6" style={{ color: '#8B7355' }} />
      )}
    </motion.button>
  );
}
