"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductImageGalleryProps {
  images: string[]
  selectedImage: number
  onImageSelect: (index: number) => void
}

export function ProductImageGallery({ images, selectedImage, onImageSelect }: ProductImageGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nextImage = () => {
    onImageSelect((selectedImage + 1) % images.length)
  }

  const prevImage = () => {
    onImageSelect(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <motion.div
          className="relative aspect-[4/3] bg-slate-800/30 rounded-2xl overflow-hidden border border-blue-500/20"
          whileHover={{ scale: isZoomed ? 1 : 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt="VoltPak 2000 Pro"
            fill
            className={`object-cover transition-transform duration-300 ${
              isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={prevImage}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={nextImage}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </motion.div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              selectedImage === index
                ? "border-blue-400 ring-2 ring-blue-400/30"
                : "border-blue-500/20 hover:border-blue-400/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onImageSelect(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`VoltPak 2000 Pro view ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full"
            >
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt="VoltPak 2000 Pro"
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setIsFullscreen(false)}
              >
                ✕
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
