"use client";

import {
  ArrowLeft,
  BarChart2,
  Clock,
  Download,
  Heart,
  Play,
  PlayCircle,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

interface CartItem extends Product {
  quantity: number;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onToggleFavorite,
  isFavorite,
}: ProductModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  if (!product) return null;

  const handleAddToCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: CartItem) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    onClose();
    router.push("/cart");
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  if (showPreview) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-5xl">
        <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 p-8">
          <button
            onClick={() => setShowPreview(false)}
            className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Course Preview
            </h2>
            <p className="text-gray-600">
              Get a glimpse of what you&apos;ll learn
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                    <Play
                      className="w-8 h-8 text-pink-600 ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-700">
                  {product.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <Star
                    className="w-6 h-6 text-yellow-400 mb-2"
                    fill="currentColor"
                  />
                  <div className="text-2xl font-bold text-gray-900">
                    {product.rating}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.reviewCount} reviews
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <Clock className="w-6 h-6 text-pink-500 mb-2" />
                  <div className="text-lg font-bold text-gray-900">
                    {product.duration}
                  </div>
                  <div className="text-sm text-gray-500">Total duration</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <BarChart2 className="w-6 h-6 text-blue-500 mb-2" />
                  <div className="text-lg font-bold text-gray-900">
                    {product.level}
                  </div>
                  <div className="text-sm text-gray-500">Difficulty</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <User className="w-6 h-6 text-green-500 mb-2" />
                  <div className="text-sm font-bold text-gray-900">
                    {product.instructor}
                  </div>
                  <div className="text-sm text-gray-500">Instructor</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">
                  What you&apos;ll learn
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleAddToCart} className="flex-1" size="lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Enroll Now - {formatPrice(product.price)} IDR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl">
      <div className="grid lg:grid-cols-[70%_30%] gap-0 min-h-[600px]">
        {/* Left Side - 70% */}
        <div className="grid md:grid-cols-2 gap-0 lg:border-r lg:border-gray-200">
          {/* Section 1: Product Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className={`object-cover ${
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

          {/* Section 2: Product Details */}
          <div className="p-6 md:p-8 flex flex-col">
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
                <Heart
                  className="w-5 h-5"
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <Star
                  className="w-5 h-5 text-yellow-400 mr-2"
                  fill="currentColor"
                />
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

            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">Instructor</div>
                  <div className="font-medium text-gray-900">
                    {product.instructor}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="font-medium text-gray-900">
                    {product.duration}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-3">
                About This Course
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.fullDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - 30% */}
        <div className="p-6 md:p-8 flex flex-col justify-between bg-gray-50">
          {/* Tags Section */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">
              Course Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm border border-gray-200 hover:border-pink-200 hover:text-pink-600 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Total Price</div>
              <div className="text-2xl font-bold text-pink-600 mb-3">
                {formatPrice(product.price)} IDR
              </div>
              <Button
                className="w-full mb-3"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
                size="lg"
                onClick={handlePreview}
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Preview Course
              </Button>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-2">
                <div className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  30-day guarantee
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  Lifetime access
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
