"use client";

import Header from "@/components/Header";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Pagination from "@/components/ui/Pagination";
import { userApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [allFavorites, setAllFavorites] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    updatePaginatedFavorites();
  }, [allFavorites, currentPage]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await userApi.getFavorites();
      setAllFavorites(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));

      const saved = localStorage.getItem("favorites");
      if (saved) {
        setFavoriteIds(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePaginatedFavorites = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setFavorites(allFavorites.slice(startIndex, endIndex));
  };

  const handleToggleFavorite = (productId: string) => {
    const newFavorites = new Set(favoriteIds);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavoriteIds(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));

    // Update the favorites list by removing the unfavorited product
    if (!newFavorites.has(productId)) {
      const updatedFavorites = allFavorites.filter((p) => p.id !== productId);
      setAllFavorites(updatedFavorites);
      setTotalPages(Math.ceil(updatedFavorites.length / ITEMS_PER_PAGE));

      // Adjust current page if necessary
      const newTotalPages = Math.ceil(updatedFavorites.length / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your <span className="text-pink-600">Favorite Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of the courses you love and want to take
          </p>
        </div>

        {!loading && allFavorites.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {allFavorites.length} favorite course
              {allFavorites.length !== 1 ? "s" : ""}
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>
        )}

        {loading ? (
          <ProductGridSkeleton />
        ) : favorites.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Heart
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No favorite courses yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring and add courses to your favorites to see them here
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
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
