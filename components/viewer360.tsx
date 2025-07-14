"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, Download, Share2 } from "lucide-react";


interface Viewer360Props {
  onClose: () => void;
}

export function Viewer360({ onClose }: Viewer360Props) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 rounded-2xl border border-blue-500/20 max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-screen relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/30 text-white hover:bg-black/50"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <iframe
            src="https://my.spline.design/untitled-HuXUxdMS3667bBCukDfvP05V/"
            frameBorder="0"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );
}