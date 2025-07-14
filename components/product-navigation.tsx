"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, BarChart3, Download, HelpCircle } from "lucide-react"
import Link from "next/link"

interface ProductNavigationProps {
  productName: string
}

export function ProductNavigation({ productName }: ProductNavigationProps) {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-16 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-blue-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Product Name */}
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-white truncate max-w-md">{productName}</h2>
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30 hidden sm:inline-flex">In Stock</Badge>
          </div>

          {/* Right Side - Navigation Menu */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-200 hover:text-white hover:bg-blue-600/20 hidden md:flex"
              asChild
            >
              <Link href="#accessories">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Accessories
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-blue-200 hover:text-white hover:bg-blue-600/20 hidden md:flex"
              asChild
            >
              <Link href="#compare">
                <BarChart3 className="w-4 h-4 mr-2" />
                Compare
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-blue-200 hover:text-white hover:bg-blue-600/20 hidden md:flex"
              asChild
            >
              <Link href="#specifications">
                <Download className="w-4 h-4 mr-2" />
                Specs
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-blue-200 hover:text-white hover:bg-blue-600/20 hidden md:flex"
              asChild
            >
              <Link href="#documentation">
                <Download className="w-4 h-4 mr-2" />
                Downloads
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-blue-200 hover:text-white hover:bg-blue-600/20 hidden md:flex"
              asChild
            >
              <Link href="#faq">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ
              </Link>
            </Button>

            <Button
              size="sm"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white ml-4"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
