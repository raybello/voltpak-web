"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Battery, Zap, Wifi, Cpu, Shield, Thermometer } from "lucide-react"

export function TechSpecs() {
  const specs = [
    {
      icon: <Battery className="w-6 h-6" />,
      label: "Battery Capacity",
      value: "2048Wh",
      detail: "51.2V, 40Ah LiFePO4",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: "Continuous Output",
      value: "2000W",
      detail: "4000W Peak (30s)",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      label: "Pure Sine Wave",
      value: "<3% THD",
      detail: "Clean power output",
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: "Efficiency",
      value: ">95%",
      detail: "At rated load",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      label: "Connectivity",
      value: "Wi-Fi 6",
      detail: "Bluetooth 5.0, Ethernet",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      label: "Control System",
      value: "Linux",
      detail: "ARM Cortex-A78",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-400/30">
            Technical Specifications
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Engineering Excellence
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Professional-grade components and cutting-edge technology in every
            VoltPak
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/20 hover:border-green-400/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg text-green-400 mr-4">
                      {spec.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{spec.label}</h3>
                      <p className="text-sm text-blue-300">{spec.detail}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {spec.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-green-400/30 text-green-300 hover:bg-green-600/20 backdrop-blur-sm bg-transparent"
          >
            View Complete Specifications
          </Button>
        </div>
      </div>
    </section>
  );
}
