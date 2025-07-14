"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import type { ReactNode } from "react"

interface ValuePropositionProps {
  icon: ReactNode
  title: string
  description: string
  features: string[]
}

export function ValueProposition({ icon, title, description, features }: ValuePropositionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full bg-slate-800/30 backdrop-blur-md border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
        <CardContent className="p-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex p-4 bg-gradient-to-r from-blue-600/20 to-green-500/20 rounded-2xl mb-6 text-blue-300"
          >
            {icon}
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">{title}</h3>

          <p className="text-blue-200 mb-6 leading-relaxed">{description}</p>

          <div className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center text-sm text-blue-200"
              >
                <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                {feature}
              </motion.div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="text-blue-300 hover:text-white hover:bg-blue-600/20 p-0 h-auto font-medium group/btn"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
