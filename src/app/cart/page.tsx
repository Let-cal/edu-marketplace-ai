"use client";

import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
  ArrowLeft,
  Clock,
  CreditCard,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(productId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-full sm:w-1/2 lg:w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="w-full sm:w-20 h-20 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1 space-y-2 w-full">
                      <div className="h-4 bg-gray-300 rounded w-full sm:w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-full sm:w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-600 mt-2">
              {totalItems} {totalItems === 1 ? "course" : "courses"} in your
              cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-pink-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any courses to your cart yet.
              Browse our amazing collection and start learning!
            </p>
            <Link href="/">
              <Button size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1 sm:pr-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700 mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            By {item.instructor}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Star
                                className="w-4 h-4 text-yellow-400 mr-1"
                                fill="currentColor"
                              />
                              {item.rating}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {item.duration}
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                item.level === "Beginner"
                                  ? "bg-green-100 text-green-700"
                                  : item.level === "Intermediate"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {item.level}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer self-start hidden sm:flex"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500">
                            Quantity:
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="text-left sm:text-right">
                            <div className="text-lg font-bold text-pink-600">
                              {formatPrice(item.price * item.quantity)} IDR
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-gray-500">
                                {formatPrice(item.price)} IDR each
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer self-start  sm:hidden"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 lg:sticky lg:top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="break-all">
                      {formatPrice(totalPrice)} IDR
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600">
                      -{formatPrice(0)} IDR
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-pink-600 break-all">
                        {formatPrice(totalPrice)} IDR
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="w-full" size="lg">
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Secure checkout with 256-bit SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
