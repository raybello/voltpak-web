"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function RelatedProducts() {
  const relatedProducts = [
    {
      id: 1,
      name: "Solar Expansion Kit",
      image: "/placeholder.svg?height=200&width=300",
      price: "$599",
      originalPrice: "$699",
      description: "400W solar panel with MPPT controller",
      compatibility: "Compatible with VoltPak 2000 Pro",
      badge: "Bundle Deal",
    },
    {
      id: 2,
      name: "Battery Expansion Module",
      image: "/placeholder.svg?height=200&width=300",
      price: "$899",
      description: "Additional 1024Wh capacity module",
      compatibility: "Hot-swappable design",
      badge: "Popular",
    },
    {
      id: 3,
      name: "Professional Carrying Case",
      image: "/placeholder.svg?height=200&width=300",
      price: "$199",
      description: "Rugged transport case with wheels",
      compatibility: "Custom fit for VoltPak 2000 Pro",
      badge: "New",
    },
    {
      id: 4,
      name: "VoltPak 1000 Lite",
      image: "/placeholder.svg?height=200&width=300",
      price: "$1,299",
      description: "Compact 1000W portable power station",
      compatibility: "Same ecosystem, smaller size",
      badge: "Alternative",
    },
  ];

  const bundles = [
    {
      name: "Complete Off-Grid Bundle",
      products: ["VoltPak 2000 Pro", "Solar Kit", "Battery Module"],
      originalPrice: "$3,997",
      bundlePrice: "$3,499",
      savings: "$498",
    },
    {
      name: "Professional Mobile Bundle",
      products: ["VoltPak 2000 Pro", "Carrying Case", "Extended Warranty"],
      originalPrice: "$2,997",
      bundlePrice: "$2,699",
      savings: "$298",
    },
  ];

  return (
    <section className="py-20 bg-slate-800/20">
      <div className="container mx-auto px-4">
        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Your Setup
            </h2>
            <p className="text-xl text-blue-200">
              Accessories and expansions designed for your VoltPak
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 overflow-hidden h-full">
                  <div className="relative">
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 z-10 bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                        {product.badge}
                      </Badge>
                    )}
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <CardContent className="p-4 flex flex-col h-full">
                    <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-blue-200 mb-2 flex-grow">
                      {product.description}
                    </p>
                    <p className="text-xs text-green-300 mb-3">
                      {product.compatibility}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-blue-400 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs"
                        asChild
                      >
                        <Link
                          href={`/products/${product.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          View Details
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white px-3"
                      >
                        <ShoppingCart className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bundle Deals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bundle Deals
            </h2>
            <p className="text-xl text-blue-200">
              Save more with our curated bundles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {bundles.map((bundle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-md border-blue-500/20 hover:border-green-400/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {bundle.name}
                        </h3>
                        <div className="space-y-1">
                          {bundle.products.map((product, productIndex) => (
                            <div
                              key={productIndex}
                              className="flex items-center text-sm text-blue-200"
                            >
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                              {product}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                        Save ${bundle.savings}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-green-400">
                            {bundle.bundlePrice}
                          </span>
                          <span className="text-lg text-blue-400 line-through">
                            {bundle.originalPrice}
                          </span>
                        </div>
                        <p className="text-sm text-blue-300">
                          You save ${bundle.savings}
                        </p>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                      Add Bundle to Cart
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
