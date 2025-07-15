"use client";

import {
  BarChart2,
  Brain,
  DollarSign,
  Folder,
  Lightbulb,
  SortDesc,
} from "lucide-react";

interface SuggestionExplanationProps {
  basedOn: {
    categories: string[];
    levels: string[];
    averagePrice?: number;
    totalInteractions: number;
  };
  onSortChange: (sortType: string) => void;
  currentSort: string;
}

const sortOptions = [
  { value: "relevance", label: "Most Relevant", icon: "ri-star-line" },
  { value: "similarity", label: "Highest Similarity", icon: "ri-heart-line" },
  { value: "rating", label: "Highest Rated", icon: "ri-award-line" },
  { value: "price-low", label: "Price: Low to High", icon: "ri-arrow-up-line" },
  {
    value: "price-high",
    label: "Price: High to Low",
    icon: "ri-arrow-down-line",
  },
];

export default function SuggestionExplanation({
  basedOn,
  onSortChange,
  currentSort,
}: SuggestionExplanationProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Explanation Section */}
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
              <Brain className="w-5 h-5  text-pink-600 text-lg"></Brain>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              AI Suggestions Based on Your Activity
            </h3>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-medium">
                Analyzed {basedOn.totalInteractions} of your interactions:
              </span>

              {basedOn.categories.length > 0 && (
                <div className="flex items-center">
                  <Folder className="w-4 h-4 mr-1 text-blue-600" />
                  <span className="mr-1">Categories:</span>
                  {basedOn.categories.slice(0, 3).map((category) => (
                    <span
                      key={category}
                      className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-1"
                    >
                      {category}
                    </span>
                  ))}
                  {basedOn.categories.length > 3 && (
                    <span className="text-blue-600 text-xs">
                      +{basedOn.categories.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center flex-wrap gap-4">
              {basedOn.levels.length > 0 && (
                <div className="flex items-center">
                  <BarChart2 className="w-4 h-4 mr-1 text-green-600" />
                  <span className="mr-1">Levels:</span>
                  {basedOn.levels.map((level) => (
                    <span
                      key={level}
                      className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs mr-1"
                    >
                      {level}
                    </span>
                  ))}
                </div>
              )}

              {basedOn.averagePrice && (
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-amber-600" />
                  <span className="mr-1">Price range around:</span>
                  <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs">
                    {formatPrice(basedOn.averagePrice)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="lg:w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <SortDesc className="w-4 h-4 mr-1 inline" />
            Sort suggestions by:
          </label>
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-pink-200">
        <div className="flex items-center text-xs text-gray-600">
          <Lightbulb className="w-4 h-4 mr-1 text-pink-500" />
          <span>
            These suggestions are personalized based on courses you&apos;ve
            viewed and favorited. The more you interact, the better our
            recommendations become!
          </span>
        </div>
      </div>
    </div>
  );
}
