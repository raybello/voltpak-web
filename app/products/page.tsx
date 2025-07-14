"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Grid, List, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  const products = [
    {
      name: "VoltPak 2000 Pro",
      image: "/voltpak-1000/image1.png?height=300&width=400",
      price: "$2,499",
      specs: ["2000W Output", "2048Wh Capacity", "Pure Sine Wave", "Wi-Fi 6"],
      availability: "Coming Soon",
      featured: true,
    },
    {
      name: "VoltPak 1000 Lite",
      image: "/voltpak-1000/image2.png?height=300&width=400",
      price: "$1,299",
      specs: ["1000W Output", "1024Wh Capacity", "Compact Design", "Bluetooth"],
      availability: "In Stock",
    },
    // {
    //   name: "VoltPak 500 Mini",
    //   image: "/placeholder.svg?height=300&width=400",
    //   price: "$699",
    //   specs: ["500W Output", "512Wh Capacity", "Ultra Portable", "USB-C PD"],
    //   availability: "In Stock",
    // },
    // {
    //   name: "Solar Expansion Kit",
    //   image: "/placeholder.svg?height=300&width=400",
    //   price: "$599",
    //   specs: [
    //     "1200W Solar Input",
    //     "MPPT Controller",
    //     "Weather Resistant",
    //     "Plug & Play",
    //   ],
    //   availability: "In Stock",
    // },
    // {
    //   name: "Battery Expansion Module",
    //   image: "/placeholder.svg?height=300&width=400",
    //   price: "$899",
    //   specs: [
    //     "1024Wh Additional",
    //     "Hot Swappable",
    //     "CAN Bus",
    //     "Modular Design",
    //   ],
    //   availability: "In Stock",
    // },
    // {
    //   name: "VoltPak DIY Kit",
    //   image: "/placeholder.svg?height=300&width=400",
    //   price: "$1,899",
    //   specs: [
    //     "Complete Components",
    //     "Assembly Guide",
    //     "Open Source",
    //     "Educational",
    //   ],
    //   availability: "Pre-Order",
    // },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />

      <div className="pt-20">
        {/* Header */}
        <section className="py-12 border-b border-blue-500/20">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Products</h1>
              <p className="text-xl text-blue-200 mb-6">Professional-grade portable power solutions for every need</p>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">Open Source Hardware</Badge>
                <Badge className="bg-green-600/20 text-green-300 border-green-400/30">Modular Design</Badge>
                <Badge className="bg-purple-600/20 text-purple-300 border-purple-400/30">Community Driven</Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-6 border-b border-blue-500/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-300 w-64"
                  />
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-slate-800/50 border-blue-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-500/30">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-blue-500/30 text-blue-300 hover:bg-blue-600/20 bg-transparent"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-blue-600 text-white" : "text-blue-300 hover:bg-blue-600/20"}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-blue-600 text-white" : "text-blue-300 hover:bg-blue-600/20"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div
              className={`grid gap-8 ${
                viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"
              }`}
            >
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  specs={product.specs}
                  availability={product.availability}
                  featured={product.featured}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
