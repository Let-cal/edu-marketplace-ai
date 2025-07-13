import { mockProducts } from "./mock-data";
import { Product } from "./types";

export const productApi = {
  getAll: async (
    page: number = 1,
    limit: number = 6
  ): Promise<{ products: Product[]; total: number; totalPages: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
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
    return mockProducts.find((p) => p.id === id) || null;
  },

  search: async (
    query: string,
    page: number = 1,
    limit: number = 6
  ): Promise<{ products: Product[]; total: number; totalPages: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
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

  getSuggestions: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

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
      return mockProducts
        .filter((p) => p.rating >= 4.6)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
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

    // Find similar products
    const suggestions = mockProducts.filter((p) => {
      // Exclude already viewed/favorited products
      if (viewedIds.includes(p.id) || favoriteIds.includes(p.id)) {
        return false;
      }

      // Score based on similarity
      let score = 0;

      // Same category gets highest score
      if (categories.includes(p.category)) {
        score += 3;
      }

      // Same level gets good score
      if (levels.includes(p.level)) {
        score += 2;
      }

      // Similar price range gets moderate score
      if (p.price >= priceRange.min && p.price <= priceRange.max) {
        score += 1;
      }

      // High rating gets bonus
      if (p.rating >= 4.6) {
        score += 1;
      }

      return score >= 2; // Minimum similarity threshold
    });

    // Sort by score and rating, then return top suggestions
    return suggestions
      .sort((a, b) => {
        // Calculate scores for sorting
        const scoreA =
          (categories.includes(a.category) ? 3 : 0) +
          (levels.includes(a.level) ? 2 : 0) +
          (a.price >= priceRange.min && a.price <= priceRange.max ? 1 : 0) +
          (a.rating >= 4.6 ? 1 : 0);
        const scoreB =
          (categories.includes(b.category) ? 3 : 0) +
          (levels.includes(b.level) ? 2 : 0) +
          (b.price >= priceRange.min && b.price <= priceRange.max ? 1 : 0) +
          (b.rating >= 4.6 ? 1 : 0);

        if (scoreA !== scoreB) return scoreB - scoreA;
        return b.rating - a.rating;
      })
      .slice(0, 6);
  },

  getChatRecommendations: async (query: string): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
};

export const userApi = {
  getFavorites: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    return mockProducts.filter((p) => favoriteIds.includes(p.id));
  },

  getRecentlyViewed: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const viewedIds = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );
    return mockProducts.filter((p) => viewedIds.includes(p.id)).slice(0, 6);
  },
};
