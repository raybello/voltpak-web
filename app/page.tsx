"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Zap, Users, Code, Battery, Cpu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"
import { ValueProposition } from "@/components/value-proposition"
import { CommunityShowcase } from "@/components/community-showcase"
import { TechSpecs } from "@/components/tech-specs"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay (optional, for visual effect) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-400/20"
          style={{ y, opacity }}
        />

        {/* Foreground Content */}
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-blue-600/20 text-blue-300 border-blue-400/30 backdrop-blur-sm">
              <Zap className="w-4 h-4 mr-2" />
              Open-Source Power Revolution
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Power Without
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                {" "}
                Limits
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-black-100 mb-4 font-light">
              Code Without Secrets
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base text-blue-200">
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-green-400" />
                2000W Output
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                2048Wh Capacity
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-400" />
                100% Open Source
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg"
                asChild
              >
                <Link href="/products">
                  Explore VoltPak 2000
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-blue-400/30 text-blue-300 hover:bg-blue-600/20 backdrop-blur-sm px-8 py-4 text-lg bg-transparent"
                asChild
              >
                <Link href="/open-source">
                  View Open Source Files
                  <Code className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-blue-300" />
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Professional-grade portable power with complete transparency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard
              name="VoltPak 2000 Pro"
              image="/voltpak-1000/image1.png?height=300&width=400"
              price="$2,499"
              specs={["2000W Output", "2048Wh Capacity", "Pure Sine Wave"]}
              availability="In Stock"
              featured
            />
            <ProductCard
              name="VoltPak 1000 Lite"
              image="/voltpak-1000/image2.png?height=300&width=400"
              price="$1,299"
              specs={["1000W Output", "1024Wh Capacity", "Compact Design"]}
              availability="Pre-Order"
            />
            <ProductCard
              name="Solar Expansion Kit"
              image="/voltpak-1000/image6.png?height=300&width=400"
              price="$599"
              specs={[
                "1200W Solar Input",
                "MPPT Controller",
                "Weather Resistant",
              ]}
              availability="In Stock"
            />
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <ValueProposition
              icon={<Code className="w-12 h-12" />}
              title="Open Source Hardware"
              description="Complete schematics, PCB layouts, and CAD files available under CERN-OHL-W license. Build, modify, and improve your power solution."
              features={[
                "Full Documentation",
                "Community Driven",
                "No Vendor Lock-in",
              ]}
            />
            <ValueProposition
              icon={<Cpu className="w-12 h-12" />}
              title="Modular Design"
              description="Swappable components for easy repair and upgrades. Customize your power station for specific needs and applications."
              features={["Easy Repairs", "Upgradeable", "Customizable"]}
            />
            <ValueProposition
              icon={<Users className="w-12 h-12" />}
              title="Community Driven"
              description="Join thousands of makers, developers, and power enthusiasts building the future of portable power technology."
              features={["Active Forums", "Shared Projects", "Expert Support"]}
            />
          </div>
        </div>
      </section>

      {/* Tech Specs Preview */}
      <TechSpecs />

      {/* Community Showcase */}
      <CommunityShowcase />

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Power Your Projects?
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Join the open-source power revolution and build something amazing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg"
                asChild
              >
                <Link href="/configure">
                  Configure Your VoltPak
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-400/30 text-green-300 hover:bg-green-600/20 backdrop-blur-sm px-8 py-4 text-lg bg-transparent"
                asChild
              >
                <Link href="/community">
                  Join Community
                  <Users className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
