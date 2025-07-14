"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Star, ArrowRight } from "lucide-react"
import Image from "next/image"

export function CommunityShowcase() {
  const projects = [
    {
      id: 1,
      title: "Off-Grid Cabin Power",
      author: "Sarah M.",
      location: "Colorado, USA",
      image: "/placeholder.svg?height=200&width=300",
      description: "Powering my remote cabin with VoltPak and solar panels",
      likes: 124,
      category: "Off-Grid",
    },
    {
      id: 2,
      title: "Mobile Workshop Setup",
      author: "Mike R.",
      location: "Ontario, Canada",
      image: "/placeholder.svg?height=200&width=300",
      description: "Custom van build with integrated VoltPak system",
      likes: 89,
      category: "Mobile",
    },
    {
      id: 3,
      title: "Emergency Backup System",
      author: "Lisa K.",
      location: "Florida, USA",
      image: "/placeholder.svg?height=200&width=300",
      description: "Hurricane-ready home backup with automatic switching",
      likes: 156,
      category: "Emergency",
    },
    {
      id: 4,
      title: "Maker Space Power Hub",
      author: "TechLab Berlin",
      location: "Berlin, Germany",
      image: "/placeholder.svg?height=200&width=300",
      description: "Portable power for community workshops and events",
      likes: 203,
      category: "Education",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-400/30">
            <Users className="w-4 h-4 mr-2" />
            Community Showcase
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powered by Community
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            See how makers, developers, and power enthusiasts are using VoltPak
            around the world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className="absolute top-3 left-3 bg-blue-600/80 text-white text-xs">
                    {project.category}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-blue-200 mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-blue-300">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {project.likes}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-blue-500/20">
                    <span className="text-sm text-blue-300">
                      by {project.author}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200 mb-6">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-green-400" />
              15,000+ Community Members
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-blue-400" />
              2,500+ Shared Projects
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-green-400" />
              85+ Countries
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              Share Your Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-400/30 text-blue-300 hover:bg-blue-600/20 backdrop-blur-sm bg-transparent"
            >
              Join Community Forum
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
