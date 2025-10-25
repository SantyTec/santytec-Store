"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Zap, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Product {
  id: string
  name: string
  price: number
  image: string
  badge?: "top" | "new"
  category: string
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Auriculares Inalámbricos Pro Max",
    price: 299.99,
    image: "/black-wireless-headphones.png",
    badge: "top",
    category: "Audio",
  },
  {
    id: "2",
    name: "Mouse Gaming RGB Elite",
    price: 79.99,
    image: "/gaming-mouse-rgb.jpg",
    badge: "new",
    category: "Gaming",
  },
  {
    id: "3",
    name: "Teclado Mecánico Retro",
    price: 149.99,
    image: "/mechanical-keyboard-retro.jpg",
    category: "Periféricos",
  },
  {
    id: "4",
    name: "Webcam 4K Ultra HD",
    price: 199.99,
    image: "/webcam-4k.jpg",
    badge: "new",
    category: "Video",
  },
  {
    id: "5",
    name: "Hub USB-C 7 en 1",
    price: 59.99,
    image: "/usb-hub-modern.jpg",
    category: "Conectividad",
  },
  {
    id: "6",
    name: "Cargador Inalámbrico Rápido",
    price: 39.99,
    image: "/wireless-charger.png",
    badge: "top",
    category: "Carga",
  },
]

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-purple-950/20 to-background pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Innovación Seleccionada</h2>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {FEATURED_PRODUCTS.map((product, index) => (
              <CarouselItem key={product.id} className="pl-6 basis-[280px]">
                <Card
                  className={`bg-card border-border/50 overflow-hidden group hover:border-tertiary/50 transition-all duration-300 ${
                    isVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <Link href={`/products/${product.id}`} className="block">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-muted/30">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <Badge
                          className={`absolute top-3 right-3 gap-1 animate-gentle-pulse ${
                            product.badge === "top"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {product.badge === "top" ? (
                            <>
                              <Zap className="h-3 w-3" />
                              TOP
                            </>
                          ) : (
                            <>
                              <Flame className="h-3 w-3" />
                              NUEVO
                            </>
                          )}
                        </Badge>
                      )}

                      {/* Hover Shadow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      {/* Category */}
                      <p className="text-xs text-tertiary font-medium uppercase tracking-wider">{product.category}</p>

                      {/* Name */}
                      <h3 className="text-lg font-semibold text-foreground line-clamp-2 leading-tight">{product.name}</h3>

                      {/* Price */}
                      <p className="text-2xl font-bold text-secondary">${product.price.toFixed(2)}</p>

                      {/* CTA */}
                      <div className="pt-2">
                        <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          Ver detalles
                          <ChevronRight className="h-4 w-4 transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <CarouselPrevious className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all -left-12" />
            <CarouselNext className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all -right-12" />
          </div>
        </Carousel>

        {/* View All CTA */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group bg-transparent"
          >
            <Link href="/products">
              Ver Todo el Catálogo
              <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}