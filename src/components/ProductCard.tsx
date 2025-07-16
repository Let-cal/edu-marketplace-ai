"use client";

import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Product } from "../lib/types";
import { formatPrice } from "../lib/utils";
import Button from "./ui/Button";
import { Card, CardContent } from "./ui/Card";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
}

export default function ProductCard({
  product,
  onViewDetails,
  onToggleFavorite,
  isFavorite,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
            isFavorite
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-pink-500"
          }`}
        >
          <Heart
            className="w-5 h-5"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
          />
        </button>

        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800">
            {product.category}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
            {product.title}
          </h3>
          <div className="text-right">
            <div className="text-lg font-bold text-pink-600">
              {formatPrice(product.price)}
            </div>
            <div className="text-xs text-gray-500">VND</div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Star
                className="w-4 h-4 text-yellow-400 mr-1"
                fill="currentColor"
                stroke="currentColor"
              />
              <span className="text-sm font-medium text-gray-700">
                {product.rating}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              ({product.reviewCount} reviews)
            </div>
          </div>
          <div className="text-xs text-gray-500">{product.duration}</div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">by {product.instructor}</div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.level === "Beginner"
                ? "bg-green-100 text-green-700"
                : product.level === "Intermediate"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.level}
          </span>
        </div>

        <Button
          onClick={() => onViewDetails(product)}
          className="w-full"
          size="sm"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
