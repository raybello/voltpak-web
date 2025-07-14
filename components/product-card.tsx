"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  name: string
  image: string
  price: string
  specs: string[]
  availability: string
  featured?: boolean
}

export function ProductCard({ name, image, price, specs, availability, featured }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Card className="bg-slate-800/50 backdrop-blur-md border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 overflow-hidden">
        <div className="relative">
          {featured && (
            <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white">
              Featured
            </Badge>
          )}
          <Badge
            className={`absolute top-4 right-4 z-10 ${
              availability === "In Stock"
                ? "bg-green-500/20 text-green-300 border-green-400/30"
                : "bg-orange-500/20 text-orange-300 border-orange-400/30"
            }`}
          >
            {availability}
          </Badge>

          <div className="relative overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={400}
              height={300}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{name}</h3>

          <div className="space-y-2 mb-4">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center text-sm text-blue-200">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                {spec}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-white">{price}</span>
            <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-blue-600/20">
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              asChild
            >
              <Link href={`/products/${name.toLowerCase().replace(/\s+/g, "-")}`}>Learn More</Link>
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
