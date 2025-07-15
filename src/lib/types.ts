export interface Product {
  id: string
  title: string
  price: number
  thumbnail: string
  description: string
  fullDescription: string
  category: string
  rating: number
  reviewCount: number
  instructor: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  similarityScore?: number;
}

export interface User {
  id: string
  name: string
  email: string
  favoriteProducts: string[]
  viewedProducts: string[]
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface SuggestionBasedOn {
  categories: string[];
  levels: string[];
  averagePrice?: number;
  totalInteractions: number;
}