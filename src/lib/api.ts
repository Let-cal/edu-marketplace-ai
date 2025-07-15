import { Product, User } from "./types";

// Cache for storing fetched data
let cachedProducts: Product[] | null = null;
let cachedUser: User | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// GitHub Gist raw URL
const GIST_URL = "/api/mock-data";

// Interface for the raw JSON structure
interface GistData {
  mockProducts: Product[];
  mockUser: User;
}

// Utility function to show error toast (you can replace with your toast implementation)
const showErrorToast = (message: string) => {
  console.error("API Error:", message);
  // Replace with your actual toast implementation
  // toast.error(message);
};

// Core fetch function with error handling
const fetchGistData = async (): Promise<GistData | null> => {
  try {
    const response = await fetch(GIST_URL, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GistData = await response.json();

    // Validate data structure
    if (!data.mockProducts || !Array.isArray(data.mockProducts)) {
      throw new Error(
        "Invalid data structure: mockProducts missing or invalid"
      );
    }

    if (!data.mockUser || typeof data.mockUser !== "object") {
      throw new Error("Invalid data structure: mockUser missing or invalid");
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch gist data:", error);
    showErrorToast("Failed to load course data. Please try again later.");
    return null;
  }
};

// Check if cache is valid
const isCacheValid = (): boolean => {
  return Date.now() - lastFetchTime < CACHE_DURATION && cachedProducts !== null;
};

// Get mock products with caching
export const getMockProducts = async (): Promise<Product[]> => {
  if (isCacheValid() && cachedProducts) {
    return cachedProducts;
  }

  const data = await fetchGistData();
  if (data) {
    cachedProducts = data.mockProducts;
    lastFetchTime = Date.now();
    return cachedProducts;
  }

  // Fallback to empty array if fetch fails
  return [];
};

// Get mock user with caching
export const getMockUser = async (): Promise<User | null> => {
  if (isCacheValid() && cachedUser) {
    return cachedUser;
  }

  const data = await fetchGistData();
  if (data) {
    cachedUser = data.mockUser;
    lastFetchTime = Date.now();
    return cachedUser;
  }

  // Fallback to null if fetch fails
  return null;
};

// Clear cache (useful for testing or manual refresh)
export const clearCache = (): void => {
  cachedProducts = null;
  cachedUser = null;
  lastFetchTime = 0;
};

// Updated product API using the new fetch functions
export const productApi = {
  getAll: async (
    page: number = 1,
    limit: number = 6
  ): Promise<{ products: Product[]; total: number; totalPages: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockProducts = await getMockProducts();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = mockProducts.slice(startIndex, endIndex);

    return {
      products,
      total: mockProducts.length,
      totalPages: Math.ceil(mockProducts.length / limit),
    };
  },

  getById: async (id: string): Promise<Product | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const mockProducts = await getMockProducts();
    return mockProducts.find((p) => p.id === id) || null;
  },

  search: async (
    query: string,
    page: number = 1,
    limit: number = 6
  ): Promise<{ products: Product[]; total: number; totalPages: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const mockProducts = await getMockProducts();
    const filtered = mockProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = filtered.slice(startIndex, endIndex);

    return {
      products,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  getByPriceRange: async (
    min: number,
    max: number,
    page: number = 1,
    limit: number = 6
  ): Promise<{ products: Product[]; total: number; totalPages: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockProducts = await getMockProducts();
    const filtered = mockProducts.filter(
      (p) => p.price >= min && p.price <= max
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = filtered.slice(startIndex, endIndex);

    return {
      products,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  getByFilters: async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: any,
    page: number = 1,
    limit: number = 6
  ): Promise<{ products: Product[]; total: number; totalPages: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const mockProducts = await getMockProducts();
    const filtered = mockProducts.filter((product) => {
      // Search query filter
      if (filters.search) {
        const searchMatch =
          product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          product.tags.some((tag: string) =>
            tag.toLowerCase().includes(filters.search.toLowerCase())
          );
        if (!searchMatch) return false;
      }

      // Category filter
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) return false;
      }

      // Level filter
      if (filters.levels && filters.levels.length > 0) {
        if (!filters.levels.includes(product.level)) return false;
      }

      // Price range filter
      if (filters.priceRange) {
        if (
          product.price < filters.priceRange.min ||
          product.price > filters.priceRange.max
        )
          return false;
      }

      // Rating filter
      if (filters.minRating && filters.minRating > 0) {
        if (product.rating < filters.minRating) return false;
      }

      // Review count filter
      if (filters.reviewCountRange && filters.reviewCountRange !== "all") {
        switch (filters.reviewCountRange) {
          case "500+":
            if (product.reviewCount < 500) return false;
            break;
          case "100-500":
            if (product.reviewCount < 100 || product.reviewCount > 500)
              return false;
            break;
          case "<100":
            if (product.reviewCount >= 100) return false;
            break;
        }
      }

      // Instructor filter
      if (filters.instructors && filters.instructors.length > 0) {
        if (!filters.instructors.includes(product.instructor)) return false;
      }

      return true;
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = filtered.slice(startIndex, endIndex);

    return {
      products,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  getSuggestions: async (
    userId: string,
    sortBy: string = "relevance"
  ): Promise<{
    products: Product[];
    basedOn: {
      categories: string[];
      levels: string[];
      averagePrice?: number;
      totalInteractions: number;
    };
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockProducts = await getMockProducts();

    // Get user's viewing and favorite history from localStorage
    const viewedIds = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");

    // Get recently viewed and favorite products
    const viewedProducts = mockProducts.filter((p) => viewedIds.includes(p.id));
    const favoriteProducts = mockProducts.filter((p) =>
      favoriteIds.includes(p.id)
    );

    // Combine for analysis
    const interactedProducts = [...viewedProducts, ...favoriteProducts];

    if (interactedProducts.length === 0) {
      // If no interaction history, return random popular products
      const popularProducts = mockProducts
        .filter((p) => p.rating >= 4.6)
        .sort(() => Math.random() - 0.5)
        .slice(0, 12);

      return {
        products: popularProducts,
        basedOn: {
          categories: [],
          levels: [],
          totalInteractions: 0,
        },
      };
    }

    // Get categories, price ranges, and levels from interacted products
    const categories = [...new Set(interactedProducts.map((p) => p.category))];
    const levels = [...new Set(interactedProducts.map((p) => p.level))];
    const avgPrice =
      interactedProducts.reduce((sum, p) => sum + p.price, 0) /
      interactedProducts.length;
    const priceRange = {
      min: avgPrice * 0.7, // 30% below average
      max: avgPrice * 1.3, // 30% above average
    };

    // Find similar products and calculate similarity scores
    const suggestions = mockProducts
      .filter((p) => {
        // Exclude already viewed/favorited products
        return !viewedIds.includes(p.id) && !favoriteIds.includes(p.id);
      })
      .map((product) => {
        // Calculate similarity score
        let similarityScore = 0;

        // Same category gets highest score
        if (categories.includes(product.category)) {
          similarityScore += 3;
        }

        // Same level gets good score
        if (levels.includes(product.level)) {
          similarityScore += 2;
        }

        // Similar price range gets moderate score
        if (
          product.price >= priceRange.min &&
          product.price <= priceRange.max
        ) {
          similarityScore += 1;
        }

        // High rating gets bonus
        if (product.rating >= 4.6) {
          similarityScore += 1;
        }

        return {
          ...product,
          similarityScore,
        };
      })
      .filter((product) => product.similarityScore >= 2); // Minimum similarity threshold

    // Apply sorting based on sortBy parameter
    const sortedSuggestions = [...suggestions];

    switch (sortBy) {
      case "similarity":
        sortedSuggestions.sort((a, b) => {
          if (a.similarityScore !== b.similarityScore) {
            return b.similarityScore - a.similarityScore;
          }
          return b.rating - a.rating; // Secondary sort by rating
        });
        break;

      case "rating":
        sortedSuggestions.sort((a, b) => {
          if (a.rating !== b.rating) {
            return b.rating - a.rating;
          }
          return b.reviewCount - a.reviewCount; // Secondary sort by review count
        });
        break;

      case "price-low":
        sortedSuggestions.sort((a, b) => {
          if (a.price !== b.price) {
            return a.price - b.price;
          }
          return b.similarityScore - a.similarityScore; // Secondary sort by similarity
        });
        break;

      case "price-high":
        sortedSuggestions.sort((a, b) => {
          if (a.price !== b.price) {
            return b.price - a.price;
          }
          return b.similarityScore - a.similarityScore; // Secondary sort by similarity
        });
        break;

      case "relevance":
      default:
        // Relevance logic: Balance between similarity score and rating
        sortedSuggestions.sort((a, b) => {
          // Calculate relevance score: 60% similarity + 40% rating (normalized)
          const relevanceA = a.similarityScore * 0.6 + a.rating * 0.4;
          const relevanceB = b.similarityScore * 0.6 + b.rating * 0.4;

          if (relevanceA !== relevanceB) {
            return relevanceB - relevanceA;
          }

          // Tertiary sort by review count for tie-breaking
          return b.reviewCount - a.reviewCount;
        });
        break;
    }

    // Return top 12 suggestions
    const finalSuggestions = sortedSuggestions.slice(0, 12);

    return {
      products: finalSuggestions,
      basedOn: {
        categories,
        levels,
        averagePrice: avgPrice,
        totalInteractions: interactedProducts.length,
      },
    };
  },

  getChatRecommendations: async (query: string): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockProducts = await getMockProducts();
    const queryLower = query.toLowerCase();

    // Keywords mapping for better matching
    const keywordMap: { [key: string]: string[] } = {
      business: [
        "business",
        "professional",
        "corporate",
        "workplace",
        "office",
      ],
      conversation: [
        "conversation",
        "speaking",
        "talk",
        "chat",
        "oral",
        "communication",
      ],
      grammar: ["grammar", "structure", "rules", "syntax", "tenses"],
      writing: ["writing", "composition", "essay", "written", "text"],
      pronunciation: [
        "pronunciation",
        "accent",
        "speaking",
        "phonics",
        "sound",
      ],
      vocabulary: ["vocabulary", "words", "lexicon", "terms", "language"],
      ielts: ["ielts", "international english", "test preparation"],
      toefl: ["toefl", "test of english", "exam"],
      toeic: ["toeic", "test of english for international"],
      beginner: ["beginner", "basic", "fundamental", "starter", "elementary"],
      intermediate: ["intermediate", "middle", "moderate"],
      advanced: ["advanced", "expert", "proficient", "high level"],
      native: ["native", "american", "british", "australian", "canadian"],
      academic: ["academic", "university", "scholarly", "formal"],
      travel: ["travel", "tourism", "vacation", "trip"],
    };

    // Find matching products based on keywords
    const matches = mockProducts.filter((product) => {
      const searchableText = `${product.title} ${product.description} ${
        product.fullDescription
      } ${product.tags.join(" ")} ${product.category}`.toLowerCase();

      // Direct text matching
      if (searchableText.includes(queryLower)) {
        return true;
      }

      // Keyword mapping matching
      for (const [key, keywords] of Object.entries(keywordMap)) {
        if (keywords.some((keyword) => queryLower.includes(keyword))) {
          if (searchableText.includes(key)) {
            return true;
          }
        }
      }

      return false;
    });

    // If no direct matches, try partial matching
    if (matches.length === 0) {
      const queryWords = queryLower
        .split(" ")
        .filter((word) => word.length > 2);
      return mockProducts
        .filter((product) => {
          const searchableText = `${product.title} ${
            product.description
          } ${product.tags.join(" ")}`.toLowerCase();
          return queryWords.some((word) => searchableText.includes(word));
        })
        .slice(0, 4);
    }

    // Sort by relevance (rating and review count)
    return matches
      .sort((a, b) => {
        const scoreA = a.rating * Math.log(a.reviewCount + 1);
        const scoreB = b.rating * Math.log(b.reviewCount + 1);
        return scoreB - scoreA;
      })
      .slice(0, 4);
  },

  getFilterOptions: async (): Promise<{
    categories: string[];
    instructors: string[];
    levels: string[];
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const mockProducts = await getMockProducts();
    const categories = [...new Set(mockProducts.map((p) => p.category))].sort();
    const instructors = [
      ...new Set(mockProducts.map((p) => p.instructor)),
    ].sort();
    const levels = [...new Set(mockProducts.map((p) => p.level))].sort();

    return { categories, instructors, levels };
  },
};

// Updated user API using the new fetch functions
export const userApi = {
  getFavorites: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockProducts = await getMockProducts();
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    return mockProducts.filter((p) => favoriteIds.includes(p.id));
  },

  getRecentlyViewed: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockProducts = await getMockProducts();
    const viewedIds = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );
    return mockProducts.filter((p) => viewedIds.includes(p.id)).slice(0, 6);
  },

  getUser: async (): Promise<User | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return await getMockUser();
  },
};
