import axios from "axios";
import { mockProducts, mockUser } from "./mock-data";
import { Product } from "./types";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockProducts;
  },

  getById: async (id: string): Promise<Product | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockProducts.find((p) => p.id === id) || null;
  },

  search: async (query: string): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
  },

  getByPriceRange: async (min: number, max: number): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockProducts.filter((p) => p.price >= min && p.price <= max);
  },

  getSuggestions: async (userId: string): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const viewedProducts = mockUser.viewedProducts;
    const favoriteProducts = mockUser.favoriteProducts;

    const suggestedProducts = mockProducts
      .filter((p) => {
        const isViewed = viewedProducts.includes(p.id);
        const isFavorite = favoriteProducts.includes(p.id);

        if (isFavorite) {
          return mockProducts.some(
            (related) =>
              related.category === p.category &&
              related.id !== p.id &&
              !viewedProducts.includes(related.id)
          );
        }

        return !isViewed && !isFavorite;
      })
      .slice(0, 4);

    return suggestedProducts;
  },
};

export const userApi = {
  getFavorites: async (userId: string): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockProducts.filter((p) => mockUser.favoriteProducts.includes(p.id));
  },

  getRecentlyViewed: async (userId: string): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockProducts
      .filter((p) => mockUser.viewedProducts.includes(p.id))
      .slice(0, 6);
  },
};
