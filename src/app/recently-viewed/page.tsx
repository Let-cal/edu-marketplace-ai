"use client";

import Header from "@/components/Header";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { userApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { History, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecentlyViewedPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentlyViewed();
    loadFavorites();
  }, []);

  const loadRecentlyViewed = async () => {
    try {
      setLoading(true);
      const data = await userApi.getRecentlyViewed("user-1");
      setRecentlyViewed(data);
    } catch (error) {
      console.error("Error loading recently viewed:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  };

  const handleToggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);

    const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const updatedViewed = [
      product.id,
      ...viewed.filter((id: string) => id !== product.id),
    ].slice(0, 10);
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewed));
  };

  const clearHistory = () => {
    localStorage.removeItem("recentlyViewed");
    setRecentlyViewed([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <History className="w-6 h-6 text-pink-600 mr-3" />{" "}
              {/* Replace ri-history-line */}
              Recently Viewed Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Continue where you left off and revisit courses you&apos;ve
              explored
            </p>
          </div>

          {recentlyViewed.length > 0 && (
            <button
              onClick={clearHistory}
              className="ml-4 px-4 py-2 text-sm text-gray-600 hover:text-red-600 border border-gray-300 hover:border-red-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Trash2 className="w-4 h-4 mr-2 inline" />{" "}
              {/* Replace ri-delete-bin-line */}
              Clear History
            </button>
          )}
        </div>

        {loading ? (
          <ProductGridSkeleton />
        ) : recentlyViewed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyViewed.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.has(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <History className="w-16 h-16 text-gray-300 mb-4" />{" "}
            {/* Replace ri-history-line */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No recently viewed courses
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring courses and they&apos;ll appear here for easy
              access
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 mr-2" /> {/* Replace ri-search-line */}
              Explore Courses
            </Link>
          </div>
        )}
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProduct ? favorites.has(selectedProduct.id) : false}
      />
    </div>
  );
}
