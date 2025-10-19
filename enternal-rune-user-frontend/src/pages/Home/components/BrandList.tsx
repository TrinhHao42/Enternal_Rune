"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const brands = [
    { id: 1, name: "Apple", image: "/images/apple.jpg" },
    { id: 2, name: "Samsung", image: "/images/samsung.jpg" },
    { id: 3, name: "Xiaomi", image: "/images/xiaomi.jpg" },
    { id: 4, name: "OPPO", image: "/images/oppo.jpg" },
    { id: 5, name: "Vivo", image: "/images/vivo.jpg" },
]

export default function BrandList() {
    const [scrollPosition, setScrollPosition] = useState(0)

    const scroll = (direction: "left" | "right") => {
        const container = document.getElementById("brand-carousel")
        if (container) {
            const scrollAmount = 300
            const newPosition =
                direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount
            container.scrollLeft = newPosition
            setScrollPosition(newPosition)
        }
    }

    return (
        <div className="relative w-full gap-4 justify-center pb-6">
            <div className="relative w-full">
                {/* Nút trái */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10"
                >
                    <ChevronLeft size={20} className="text-gray-900" />
                </button>

                {/* Carousel */}
                <div
                    id="brand-carousel"
                    className="flex gap-4 overflow-x-auto scroll-smooth items-center justify-between pb-2"
                    style={{ scrollBehavior: "smooth" }}
                >
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="flex-shrink-0 w-60 cursor-pointer group transition-transform hover:-translate-y-1"
                        >
                            <div className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all">
                                <div className="relative h-24 bg-gray-50 overflow-hidden rounded-t-lg">
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        width={140}
                                        height={100}
                                    />
                                </div>
                                <div className="p-2 text-center">
                                    <p className="font-semibold text-gray-900 text-sm">{brand.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Nút phải */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10"
                >
                    <ChevronRight size={20} className="text-gray-900" />
                </button>
            </div>
        </div>
    )
}
