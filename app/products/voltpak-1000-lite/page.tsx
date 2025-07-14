"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Zap,
  Battery,
  Wifi,
  Shield,
  Download,
  Play,
  Plus,
  Minus,
  Check,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/navigation";
import { ProductNavigation } from "@/components/product-navigation";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ProductConfigurator } from "@/components/product-configurator";
import { TechnicalSpecs } from "@/components/technical-specs";
import { ProductReviews } from "@/components/product-reviews";
import { RelatedProducts } from "@/components/related-products";
import { Canvas, useThree } from "@react-three/fiber";
import { Viewer360 } from "@/components/viewer360";

export default function VoltPak1000ProPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedConfiguration, setSelectedConfiguration] =
    useState("standard");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [show360Viewer, setShow360Viewer] = useState(false);

  const productImages = [
    "/voltpak-1000/image1.png?height=600&width=800",
    "/voltpak-1000/image2.png?height=600&width=800",
    "/voltpak-1000/image3.png?height=600&width=800",
    "/voltpak-1000/image4.png?height=600&width=800",
    "/voltpak-1000/image6.png?height=600&width=800",
    "/voltpak-1000/image7.png?height=600&width=800",
  ];

  const configurations = {
    standard: {
      name: "Standard Configuration",
      price: 2499,
      description: "Complete VoltPak 1000 Pro with all essential features",
      includes: [
        "VoltPak 1000 Pro Unit",
        "AC Charging Cable",
        "User Manual",
        "1-Year Warranty",
      ],
    },
    solar: {
      name: "Solar Bundle",
      price: 3099,
      description: "VoltPak 1000 Pro with integrated solar charging capability",
      includes: [
        "VoltPak 1000 Pro Unit",
        "400W Solar Panel",
        "MPPT Controller",
        "Solar Cables",
        "2-Year Warranty",
      ],
    },
    pro: {
      name: "Pro Bundle",
      price: 3499,
      description: "Complete professional setup with expansion modules",
      includes: [
        "VoltPak 1000 Pro Unit",
        "Battery Expansion Module",
        "Professional Carrying Case",
        "Extended Warranty",
      ],
    },
  };

  const keyFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "1000W Pure Sine Wave",
      description: "Clean, stable power for sensitive electronics",
    },
    {
      icon: <Battery className="w-6 h-6" />,
      title: "2048Wh LiFePO4 Battery",
      description: "Long-lasting, safe lithium iron phosphate cells",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Smart Connectivity",
      description: "Wi-Fi 6, Bluetooth 5.0, and mobile app control",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Advanced Protection",
      description: "Multi-layer safety systems and certifications",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />
      <ProductNavigation productName="VoltPak 1000W UPS Inverter" />

      <div className="pt-32">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-blue-300">
            <span>Home</span> <span className="mx-2">/</span>
            <span>Products</span> <span className="mx-2">/</span>
            <span className="text-white">VoltPak 1000 Pro</span>
          </nav>
        </div>

        {/* Product Overview */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ProductImageGallery
                  images={productImages}
                  selectedImage={selectedImage}
                  onImageSelect={setSelectedImage}
                />
                {/* 360° View Button */}
                <Button
                  variant="outline"
                  onClick={() => setShow360Viewer(true)}
                  className="w-full border-blue-400/30 text-blue-300 hover:bg-blue-600/20 bg-transparent mt-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="mr-2"
                  >
                    🔄
                  </motion.div>
                  360° Interactive View
                </Button>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                      In Stock
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                      Featured
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                      Open Source
                    </Badge>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    VoltPak 1000 Pro
                  </h1>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                      <span className="ml-2 text-blue-200">(127 reviews)</span>
                    </div>
                  </div>
                  <div className="items-center gap-4 mb-4">
                    <span className="font-bold">
                      {" "}
                      $
                      {(
                        configurations[
                          selectedConfiguration as keyof typeof configurations
                        ].price * quantity
                      ).toLocaleString()}
                      .00 CAD{" "}
                    </span>
                  </div>

                  <p className="text-xl text-blue-200 leading-relaxed mb-6">
                    Professional-grade portable power station with 1000W pure
                    sine wave output, 2048Wh LiFePO4 battery, and complete
                    open-source transparency. Perfect for off-grid adventures,
                    emergency backup, and professional applications.
                  </p>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {keyFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-blue-500/20"
                      >
                        <div className="text-blue-400 mt-1">{feature.icon}</div>
                        <div>
                          <h3 className="font-semibold text-white text-sm">
                            {feature.title}
                          </h3>
                          <p className="text-xs text-blue-300">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Configuration Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Choose Configuration
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(configurations).map(([key, config]) => (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedConfiguration === key
                            ? "border-blue-400 bg-blue-500/10"
                            : "border-blue-500/20 bg-slate-800/30 hover:border-blue-400/40"
                        }`}
                        onClick={() => setSelectedConfiguration(key)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">
                            {config.name}
                          </h4>
                          <span className="text-2xl font-bold text-green-400">
                            ${config.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-blue-200 mb-2">
                          {config.description}
                        </p>
                        <div className="text-xs text-blue-300">
                          Includes: {config.includes.join(", ")}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-blue-500/30 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-blue-300 hover:text-white hover:bg-blue-600/20"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-2 text-white font-semibold">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="text-blue-300 hover:text-white hover:bg-blue-600/20"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="text-blue-200">Available: 15 units</span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart - $
                      {(
                        configurations[
                          selectedConfiguration as keyof typeof configurations
                        ].price * quantity
                      ).toLocaleString()}
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className={`border-blue-400/30 hover:bg-blue-600/20 ${
                        isWishlisted
                          ? "text-red-400 border-red-400/30"
                          : "text-blue-300"
                      }`}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isWishlisted ? "fill-current" : ""
                        }`}
                      />
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue-400/30 text-blue-300 hover:bg-blue-600/20 bg-transparent"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-green-400/30 text-green-300 hover:bg-green-600/20 bg-transparent"
                    onClick={() => setShowConfigurator(true)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    3D Product Configurator
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-blue-500/20">
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-200">2-Year Warranty</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-200">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Download className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-200">Open Source</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-blue-500/20">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="documentation"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Documentation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-4">
                        What's Included
                      </h3>
                      <div className="space-y-3">
                        {configurations[
                          selectedConfiguration as keyof typeof configurations
                        ].includes.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center text-blue-200"
                          >
                            <Check className="w-4 h-4 text-green-400 mr-3" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-4">
                        Key Applications
                      </h3>
                      <div className="space-y-3">
                        {[
                          "Off-grid camping and RV power",
                          "Emergency home backup",
                          "Professional photography/videography",
                          "Construction site power",
                          "Outdoor events and festivals",
                          "Research and field work",
                        ].map((application, index) => (
                          <div
                            key={index}
                            className="flex items-center text-blue-200"
                          >
                            <Zap className="w-4 h-4 text-blue-400 mr-3" />
                            {application}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-8 bg-slate-800/30 backdrop-blur-md border-blue-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Product Features
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Pure Sine Wave Output",
                          description:
                            "Clean, stable power suitable for sensitive electronics and medical devices",
                        },
                        {
                          title: "Modular Design",
                          description:
                            "Expandable system with hot-swappable modules for easy maintenance",
                        },
                        {
                          title: "Smart Monitoring",
                          description:
                            "Real-time monitoring via mobile app with detailed analytics",
                        },
                        {
                          title: "Fast Charging",
                          description:
                            "Multiple charging options including AC, solar, and DC input",
                        },
                        {
                          title: "Safety First",
                          description:
                            "Multiple protection layers including BMS, fuses, and thermal management",
                        },
                        {
                          title: "Open Source",
                          description:
                            "Complete transparency with downloadable schematics and documentation",
                        },
                      ].map((feature, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="font-semibold text-white">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-blue-200">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-8">
                <TechnicalSpecs />
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <ProductReviews />
              </TabsContent>

              <TabsContent value="documentation" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "User Manual",
                      description: "Complete setup and operation guide",
                      format: "PDF",
                      size: "2.4 MB",
                      icon: <Download className="w-5 h-5" />,
                    },
                    {
                      title: "Schematics",
                      description: "Complete electrical schematics",
                      format: "PDF",
                      size: "1.8 MB",
                      icon: <Download className="w-5 h-5" />,
                    },
                    {
                      title: "CAD Files",
                      description: "3D models and mechanical drawings",
                      format: "STEP",
                      size: "15.2 MB",
                      icon: <Download className="w-5 h-5" />,
                    },
                    {
                      title: "PCB Layout",
                      description: "KiCad project files",
                      format: "ZIP",
                      size: "5.7 MB",
                      icon: <Download className="w-5 h-5" />,
                    },
                    {
                      title: "Firmware",
                      description: "Latest firmware and source code",
                      format: "ZIP",
                      size: "12.3 MB",
                      icon: <Download className="w-5 h-5" />,
                    },
                    {
                      title: "API Documentation",
                      description: "Developer API reference",
                      format: "HTML",
                      size: "Online",
                      icon: <Info className="w-5 h-5" />,
                    },
                  ].map((doc, index) => (
                    <Card
                      key={index}
                      className="bg-slate-800/30 backdrop-blur-md border-blue-500/20 hover:border-blue-400/40 transition-all cursor-pointer group"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                            {doc.icon}
                          </div>
                          <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                            {doc.format}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-blue-200 mb-3">
                          {doc.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-300">
                            {doc.size}
                          </span>
                          <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts />

        {/* Product Configurator Modal */}
        <AnimatePresence>
          {showConfigurator && (
            <ProductConfigurator onClose={() => setShowConfigurator(false)} />
          )}
          {show360Viewer && (
            <Viewer360 onClose={() => setShow360Viewer(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
