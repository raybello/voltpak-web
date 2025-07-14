"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, ShoppingCart, Menu, X, Zap, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md border-b border-blue-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="p-2 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              VoltPak
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-blue-200 hover:text-white transition-colors">
                <span>All Products</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800/95 backdrop-blur-md border-blue-500/20">
                <DropdownMenuItem asChild>
                  <Link href="/products/voltpack-2000-pro">VoltPak 2000 Pro</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/voltpack-1000-lite">VoltPak 1000 Lite</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/accessories">Accessories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/diy-kits">DIY Kits</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-blue-200 hover:text-white transition-colors">
                <span>Explore</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800/95 backdrop-blur-md border-blue-500/20">
                <DropdownMenuItem asChild>
                  <Link href="/community">Community Gallery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/use-cases">Use Cases</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/open-source">Open Source</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog">Blog & News</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-blue-200 hover:text-white transition-colors">
                <span>Support</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800/95 backdrop-blur-md border-blue-500/20">
                <DropdownMenuItem asChild>
                  <Link href="/docs">Documentation</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tutorials">Tutorials</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/forum">Community Forum</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">Contact Support</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/dealers"
              className="text-blue-200 hover:text-white transition-colors"
            >
              Where to Buy
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <AnimatePresence>
                {searchExpanded ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="flex items-center"
                  >
                    <Input
                      placeholder="Search products, docs..."
                      className="bg-slate-800/50 border-blue-500/30 text-white placeholder-blue-300"
                      autoFocus
                      onBlur={() => setSearchExpanded(false)}
                    />
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchExpanded(true)}
                    className="text-blue-200 hover:text-white hover:bg-blue-600/20"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-200 hover:text-white hover:bg-blue-600/20"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800/95 backdrop-blur-md border-blue-500/20">
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Order History</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/developer">Developer Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-blue-200 hover:text-white hover:bg-blue-600/20"
            >
              <ShoppingCart className="w-5 h-5" />
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5">
                2
              </Badge>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-blue-200 hover:text-white hover:bg-blue-600/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-blue-500/20 py-4"
            >
              <div className="space-y-4">
                <Link
                  href="/products"
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  All Products
                </Link>
                <Link
                  href="/explore"
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Explore
                </Link>
                <Link
                  href="/support"
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Support
                </Link>
                <Link
                  href="/dealers"
                  className="block text-blue-200 hover:text-white transition-colors"
                >
                  Where to Buy
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
