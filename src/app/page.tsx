"use client";

import Header from "@/components/Header";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import SearchFilters from "@/components/SearchFilters";
import Pagination from "@/components/ui/Pagination";
import { productApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { Wand2, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Search/Filter state
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentPriceFilter, setCurrentPriceFilter] = useState({
    min: 0,
    max: Infinity,
  });

  useEffect(() => {
    loadProducts();
    loadFavorites();
  }, [currentPage]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll(currentPage, 6);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotalProducts(data.total);
    } catch (error) {
      console.error("Error loading products:", error);
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

  const handleSearch = async (query: string) => {
    setCurrentSearch(query);
    setCurrentPage(1);
    setShowSuggestions(false);

    if (!query.trim()) {
      loadProducts();
      return;
    }

    try {
      setSearchLoading(true);
      const data = await productApi.search(query, 1, 6);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotalProducts(data.total);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handlePriceFilter = async (min: number, max: number) => {
    setCurrentPriceFilter({ min, max });
    setCurrentPage(1);
    setShowSuggestions(false);

    if (min === 0 && max === Infinity) {
      if (currentSearch) {
        handleSearch(currentSearch);
      } else {
        loadProducts();
      }
      return;
    }

    try {
      setSearchLoading(true);
      const data = await productApi.getByPriceRange(min, max, 1, 6);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotalProducts(data.total);
    } catch (error) {
      console.error("Error filtering products:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleGetSuggestions = async () => {
    try {
      setSuggestionsLoading(true);
      const results = await productApi.getSuggestions();
      setSuggestions(results);
      setShowSuggestions(true);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error getting suggestions:", error);
    } finally {
      setSuggestionsLoading(false);
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

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      setLoading(true);
      let data;

      if (showSuggestions) {
        // For suggestions, we don't paginate since it's limited
        return;
      } else if (currentSearch) {
        data = await productApi.search(currentSearch, page, 6);
      } else if (
        currentPriceFilter.min !== 0 ||
        currentPriceFilter.max !== Infinity
      ) {
        data = await productApi.getByPriceRange(
          currentPriceFilter.min,
          currentPriceFilter.max,
          page,
          6
        );
      } else {
        data = await productApi.getAll(page, 6);
      }

      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotalProducts(data.total);
    } catch (error) {
      console.error("Error loading page:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayProducts = showSuggestions ? suggestions : products;
  const shouldShowPagination = !showSuggestions && totalPages > 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing{" "}
            <span className="text-pink-600">Educational Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of premium courses designed to boost
            your skills and career
          </p>
        </div>

        <SearchFilters
          onSearch={handleSearch}
          onPriceFilter={handlePriceFilter}
          onGetSuggestions={handleGetSuggestions}
          loading={searchLoading}
          suggestionsLoading={suggestionsLoading}
        />

        {showSuggestions && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Wand2 className="w-6 h-6 text-pink-600 mr-2" />
                Smart Suggestions for You
              </h2>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Based on your viewing history and preferences, we think
              you&apos;ll love these courses
            </p>
          </div>
        )}

        {!showSuggestions && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {products.length} of {totalProducts} courses
              {currentSearch && ` for "${currentSearch}"`}
            </p>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}

        {loading ? (
          <ProductGridSkeleton />
        ) : displayProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.has(product.id)}
                />
              ))}
            </div>

            {shouldShowPagination && !loading && (
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
            <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you&apos;re
              looking for
            </p>
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
