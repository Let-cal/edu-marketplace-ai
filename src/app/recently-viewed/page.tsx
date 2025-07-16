"use client";

import Header from "@/components/Header";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Pagination from "@/components/ui/Pagination";
import { userApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { History, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

export default function RecentlyViewedPage() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [allRecentlyViewed, setAllRecentlyViewed] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadRecentlyViewed();
    loadFavorites();
  }, []);

  useEffect(() => {
    updatePaginatedViewed();
  }, [allRecentlyViewed, currentPage]);

  const loadRecentlyViewed = async () => {
    try {
      setLoading(true);
      const data = await userApi.getRecentlyViewed();
      setAllRecentlyViewed(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error loading recently viewed:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePaginatedViewed = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setRecentlyViewed(allRecentlyViewed.slice(startIndex, endIndex));
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearHistory = () => {
    localStorage.removeItem("recentlyViewed");
    setAllRecentlyViewed([]);
    setRecentlyViewed([]);
    setTotalPages(1);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-pink-600">Recently Viewed</span> Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Continue where you left off with these recently viewed courses
          </p>
        </div>

        {!loading && allRecentlyViewed.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {allRecentlyViewed.length} recently viewed course
              {allRecentlyViewed.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center space-x-4">
              {totalPages > 1 && (
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
              )}
              <button
                onClick={handleClearHistory}
                className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Clear History
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <ProductGridSkeleton />
        ) : recentlyViewed.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
          <div className="text-center py-12 flex flex-col items-center">
            <History className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No recently viewed courses
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring courses to see your viewing history here
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
        isFavorite={selectedProduct ? favorites.has(selectedProduct.id) : false}
      />
    </div>
  );
}
