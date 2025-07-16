"use client";

import ChatBot from "@/components/ChatBot";
import Header from "@/components/Header";
import { ProductGridSkeleton } from "@/components/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import SearchFilters, { FilterCriteria } from "@/components/SearchFilters";
import SuggestionExplanation from "@/components/SuggestionExplanation";
import Pagination from "@/components/ui/Pagination";
import { productApi } from "@/lib/api";
import { Product, SuggestionBasedOn } from "@/lib/types";
import { Heart, HeartOff, Search, Wand2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [suggestionBasedOn, setSuggestionBasedOn] =
    useState<SuggestionBasedOn | null>(null);
  const [suggestionSort, setSuggestionSort] = useState("relevance");

  // Filter options
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableInstructors, setAvailableInstructors] = useState<string[]>(
    []
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Current filters
  const [currentFilters, setCurrentFilters] = useState<FilterCriteria>({
    search: "",
    categories: [],
    levels: [],
    priceRange: { min: 0, max: Infinity },
    minRating: 0,
    reviewCountRange: "all",
    instructors: [],
  });

  useEffect(() => {
    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showSuggestions) {
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, showSuggestions]);

  const initializeData = async () => {
    try {
      // Load filter options
      const filterOptions = await productApi.getFilterOptions();
      setAvailableCategories(filterOptions.categories);
      setAvailableInstructors(filterOptions.instructors);

      // Load initial products
      loadProducts();
      loadFavorites();
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  };

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

  const handleFiltersChange = async (filters: FilterCriteria) => {
    setCurrentFilters(filters);
    setCurrentPage(1);
    setShowSuggestions(false);

    // Check if any filters are applied
    const hasFilters =
      filters.search ||
      filters.categories.length > 0 ||
      filters.levels.length > 0 ||
      filters.priceRange.min > 0 ||
      filters.priceRange.max < Infinity ||
      filters.minRating > 0 ||
      filters.reviewCountRange !== "all" ||
      filters.instructors.length > 0;

    if (!hasFilters) {
      loadProducts();
      return;
    }

    try {
      setSearchLoading(true);
      const data = await productApi.getByFilters(filters, 1, 6);
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
      const results = await productApi.getSuggestions("user-1", suggestionSort);
      setSuggestions(results.products);
      setSuggestionBasedOn(results.basedOn);
      setShowSuggestions(true);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error getting suggestions:", error);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const handleSuggestionSortChange = async (sortType: string) => {
    setSuggestionSort(sortType);
    if (showSuggestions) {
      try {
        setSuggestionsLoading(true);
        const results = await productApi.getSuggestions("user-1", sortType);
        setSuggestions(results.products);
        setSuggestionBasedOn(results.basedOn);
      } catch (error) {
        console.error("Error sorting suggestions:", error);
      } finally {
        setSuggestionsLoading(false);
      }
    }
  };

  const handleToggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    let isAdding = false;
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
      isAdding = true;
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
    if (isAdding) {
      toast.success("Course added to favorites!", {
        description: "Visit the favorites page to view it again!",
        icon: <Heart className="w-5 h-5 text-pink-500 fill-current" />,
        action: {
          label: "View Favorites",
          onClick: () => {
            window.location.href = "/favorites";
          },
        },
      });
    } else {
      toast("Course removed from favorites", {
        description: "The course has been removed from your favorites list.",
        icon: <HeartOff className="w-5 h-5 text-gray-500" />,
      });
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

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (showSuggestions) {
      // For suggestions, handle pagination differently since we have 12 items
      return;
    }

    try {
      setLoading(true);
      const data = await productApi.getByFilters(currentFilters, page, 6);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotalProducts(data.total);
    } catch (error) {
      console.error("Error loading page:", error);
    } finally {
      setLoading(false);
    }
  };

  // For suggestions, we need to paginate client-side since we have all 12 items
  const displayProducts = showSuggestions
    ? suggestions.slice((currentPage - 1) * 6, currentPage * 6)
    : products;

  const effectiveTotalPages = showSuggestions
    ? Math.ceil(suggestions.length / 6)
    : totalPages;

  const shouldShowPagination =
    (showSuggestions && suggestions.length > 6) ||
    (!showSuggestions && totalPages > 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Master <span className="text-pink-600">English Language</span>{" "}
            Skills
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive collection of English learning courses
            designed to boost your language skills and confidence
          </p>
        </div>

        <SearchFilters
          onFiltersChange={handleFiltersChange}
          onGetSuggestions={handleGetSuggestions}
          loading={searchLoading}
          suggestionsLoading={suggestionsLoading}
          availableCategories={availableCategories}
          availableInstructors={availableInstructors}
        />

        {showSuggestions && suggestionBasedOn && (
          <SuggestionExplanation
            basedOn={suggestionBasedOn}
            onSortChange={handleSuggestionSortChange}
            currentSort={suggestionSort}
          />
        )}

        {showSuggestions && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Wand2 className="w-6 h-6 text-pink-600 mr-2" />
                Smart Suggestions for You
              </h2>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer flex items-center px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 mr-1" />
                Back to Browse
              </button>
            </div>
          </div>
        )}

        {!showSuggestions && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {products.length} of {totalProducts} courses
              {currentFilters.search && ` for "${currentFilters.search}"`}
            </p>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}

        {showSuggestions && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {displayProducts.length} of {suggestions.length} suggested
              courses
            </p>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {effectiveTotalPages}
            </p>
          </div>
        )}

        {loading || suggestionsLoading ? (
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

            {shouldShowPagination && !loading && !suggestionsLoading && (
              <Pagination
                currentPage={currentPage}
                totalPages={effectiveTotalPages}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12 flex flex-col items-center">
            <Search className="w-16 h-16 text-gray-300 mb-4" />
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

      <ChatBot
        onViewDetails={handleViewDetails}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
      />
    </div>
  );
}
