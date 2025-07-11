"use client";

import { useState } from "react";
import { Product } from "../lib/types";
import { formatPrice } from "../lib/utils";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onToggleFavorite,
  isFavorite,
}: ProductModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100">
            <img
              src={product.thumbnail}
              alt={product.title}
              className={`w-full h-full object-cover ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700 mb-2">
                {product.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h2>
              <div className="text-3xl font-bold text-pink-600 mb-1">
                {formatPrice(product.price)} IDR
              </div>
            </div>

            <button
              onClick={() => onToggleFavorite(product.id)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                isFavorite
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-500"
              }`}
            >
              <i
                className={`ri-heart-${isFavorite ? "fill" : "line"} text-xl`}
              ></i>
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <i className="ri-star-fill text-yellow-400 text-lg mr-2"></i>
              <span className="font-semibold text-gray-700 mr-1">
                {product.rating}
              </span>
              <span className="text-gray-500">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
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

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <i className="ri-user-line text-gray-400 mr-2"></i>
              <div>
                <div className="text-xs text-gray-500">Instructor</div>
                <div className="font-medium text-gray-900">
                  {product.instructor}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <i className="ri-time-line text-gray-400 mr-2"></i>
              <div>
                <div className="text-xs text-gray-500">Duration</div>
                <div className="font-medium text-gray-900">
                  {product.duration}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              About This Course
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1" size="lg">
              <i className="ri-shopping-cart-line mr-2"></i>
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <i className="ri-play-circle-line mr-2"></i>
              Preview
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
