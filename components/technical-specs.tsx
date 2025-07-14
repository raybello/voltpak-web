"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TechnicalSpecs() {
  const specifications = {
    "Power Specifications": [
      { label: "Continuous Output", value: "2000W", unit: "Pure Sine Wave" },
      { label: "Peak Output", value: "4000W", unit: "30 seconds" },
      { label: "Battery Capacity", value: "2048Wh", unit: "51.2V, 40Ah" },
      { label: "Battery Type", value: "LiFePO4", unit: "Lithium Iron Phosphate" },
      { label: "Efficiency", value: ">95%", unit: "At rated load" },
      { label: "THD", value: "<3%", unit: "Total Harmonic Distortion" },
    ],
    "Input/Output Ports": [
      { label: "AC Output", value: "2x NEMA 5-15R", unit: "120V, 15A each" },
      { label: "USB-C PD", value: "4x Ports", unit: "100W each" },
      { label: "USB-A", value: "4x Ports", unit: "18W QC3.0" },
      { label: "DC Output", value: "2x 12V/10A", unit: "Barrel jack" },
      { label: "Anderson Powerpole", value: "2x 12V/30A", unit: "High current" },
      { label: "AC Input", value: "100-240V", unit: "50/60Hz, 1200W max" },
    ],
    Connectivity: [
      { label: "Wi-Fi", value: "802.11ac", unit: "Dual-band" },
      { label: "Bluetooth", value: "5.0 LE", unit: "Low Energy" },
      { label: "Ethernet", value: "Gigabit", unit: "RJ45" },
      { label: "CAN Bus", value: "Integrated", unit: "Battery management" },
      { label: "RS485", value: "Industrial", unit: "Communication protocol" },
      { label: "GPIO", value: "40-pin", unit: "Custom modules" },
    ],
    "Physical Specifications": [
      { label: "Dimensions", value: "350 × 230 × 280", unit: "mm (L×W×H)" },
      { label: "Weight", value: "22.5 kg", unit: "49.6 lbs" },
      { label: "Operating Temperature", value: "-10°C to 50°C", unit: "14°F to 122°F" },
      { label: "Storage Temperature", value: "-20°C to 60°C", unit: "-4°F to 140°F" },
      { label: "Humidity", value: "10-90%", unit: "Non-condensing" },
      { label: "IP Rating", value: "IP54", unit: "Dust and splash resistant" },
    ],
    "Safety & Certifications": [
      { label: "Safety Standards", value: "UL 2089", unit: "Portable power stations" },
      { label: "EMC", value: "FCC Part 15", unit: "Class B" },
      { label: "CE Marking", value: "Compliant", unit: "European conformity" },
      { label: "Battery Safety", value: "UN 38.3", unit: "Transport certified" },
      { label: "RoHS", value: "Compliant", unit: "Lead-free" },
      { label: "Energy Star", value: "Certified", unit: "Energy efficient" },
    ],
    "Software & Control": [
      { label: "Operating System", value: "Linux", unit: "Embedded Yocto" },
      { label: "Processor", value: "ARM Cortex-A78", unit: "Quad-core 2.0GHz" },
      { label: "Memory", value: "4GB RAM", unit: "LPDDR5" },
      { label: "Storage", value: "32GB eMMC", unit: "Expandable" },
      { label: "Display", value: '5" TFT', unit: "800×480 touchscreen" },
      { label: "API", value: "RESTful", unit: "WebSocket support" },
    ],
  }

  return (
    <div className="space-y-8">
      {Object.entries(specifications).map(([category, specs], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
        >
          <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-400/30">{category}</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center justify-between py-3 border-b border-blue-500/10 last:border-b-0"
                  >
                    <div className="flex-1">
                      <span className="text-white font-medium">{spec.label}</span>
                      {spec.unit && <p className="text-sm text-blue-300 mt-1">{spec.unit}</p>}
                    </div>
                    <div className="text-right">
                      <span className="text-green-400 font-semibold">{spec.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Download Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-blue-600/10 to-green-600/10 border-blue-400/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Complete Technical Documentation</h3>
            <p className="text-blue-200 mb-6">
              Download comprehensive specifications, schematics, and technical documentation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Download PDF Specifications
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-green-400/30 text-green-300 hover:bg-green-600/20 rounded-lg font-medium transition-colors"
              >
                View Interactive Specs
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
