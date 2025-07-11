"use client";

import Header from "@/components/Header";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { userApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await userApi.getFavorites("user-1");
      setFavorites(data);
      setFavoriteIds(new Set(data.map((p) => p.id)));
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    const newFavoriteIds = new Set(favoriteIds);
    if (newFavoriteIds.has(productId)) {
      newFavoriteIds.delete(productId);
      setFavorites((prev) => prev.filter((p) => p.id !== productId));
    } else {
      newFavoriteIds.add(productId);
    }
    setFavoriteIds(newFavoriteIds);
    localStorage.setItem("favorites", JSON.stringify([...newFavoriteIds]));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Heart
              className="w-6 h-6 text-pink-600 mr-3"
              fill="currentColor"
              stroke="currentColor"
            />
            Your Favorite Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of the courses you love and want to revisit
          </p>
        </div>

        {loading ? (
          <ProductGridSkeleton />
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favoriteIds.has(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <i className="ri-heart-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No favorite courses yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring and add courses to your favorites by clicking the
              heart icon
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 mr-2" />
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
        isFavorite={
          selectedProduct ? favoriteIds.has(selectedProduct.id) : false
        }
      />
    </div>
  );
}
