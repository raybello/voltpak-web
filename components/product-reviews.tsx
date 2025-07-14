"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, MessageCircle, Verified } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProductReviews() {
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      title: "Exceptional build quality and performance",
      content:
        "I've been using the VoltPak 2000 Pro for 6 months now in my off-grid cabin. The build quality is outstanding, and the open-source documentation made it easy to integrate with my existing solar setup. The mobile app is intuitive and the real-time monitoring is incredibly useful.",
      date: "2 weeks ago",
      verified: true,
      helpful: 24,
      images: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      id: 2,
      author: "Mike R.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      title: "Perfect for professional photography",
      content:
        "As a professional photographer, I need reliable power for my equipment during outdoor shoots. The VoltPak 2000 Pro delivers clean, stable power that doesn't interfere with my sensitive camera equipment. The pure sine wave output is crucial for my work.",
      date: "1 month ago",
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      author: "TechReviewer_Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      title: "Great specs, minor software quirks",
      content:
        "The hardware is impressive - 2000W output, excellent battery life, and the modular design is brilliant. The open-source aspect is a huge plus. However, the mobile app could use some polish. Overall, highly recommended for tech enthusiasts.",
      date: "1 month ago",
      verified: false,
      helpful: 31,
    },
    {
      id: 4,
      author: "Lisa K.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      title: "Saved us during hurricane season",
      content:
        "Living in Florida, reliable backup power is essential. The VoltPak 2000 Pro kept our essential appliances running for 3 days during a recent power outage. The automatic switching worked flawlessly, and the battery management system gave us confidence in its safety.",
      date: "2 months ago",
      verified: true,
      helpful: 42,
    },
  ];

  const overallRating = 4.8
  const totalReviews = 127

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 28, percentage: 22 },
    { stars: 3, count: 7, percentage: 6 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ]

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/20">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {overallRating}
              </div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(overallRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <p className="text-blue-200">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-3">
                  <span className="text-sm text-blue-200 w-8">
                    {rating.stars}★
                  </span>
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-blue-200 w-8">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.author}
                    />
                    <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white">
                        {review.author}
                      </h4>
                      {review.verified && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                          <Verified className="w-3 h-3 mr-1" />
                          Verified Purchase
                        </Badge>
                      )}
                      <span className="text-sm text-blue-300">
                        {review.date}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>

                    <h5 className="font-semibold text-white mb-2">
                      {review.title}
                    </h5>
                    <p className="text-blue-200 leading-relaxed mb-4">
                      {review.content}
                    </p>

                    {review.images && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="w-20 h-20 bg-slate-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Review image ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-300 hover:text-white hover:bg-blue-600/20"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-300 hover:text-white hover:bg-blue-600/20"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Write Review CTA */}
      <Card className="bg-gradient-to-r from-blue-600/10 to-green-600/10 border-blue-400/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              Share Your Experience
            </h3>
            <p className="text-blue-200 mb-6">
              Help other customers by writing a review of your VoltPak 2000 Pro
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              Write a Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
