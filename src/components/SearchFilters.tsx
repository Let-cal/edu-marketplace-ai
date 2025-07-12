"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search, Wand2 } from "lucide-react";
import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onPriceFilter: (min: number, max: number) => void;
  onGetSuggestions: () => void;
  loading?: boolean;
  suggestionsLoading?: boolean;
}

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under 500K", min: 0, max: 500000 },
  { label: "500K - 1M", min: 500000, max: 1000000 },
  { label: "Over 1M", min: 1000000, max: Infinity },
];

export default function SearchFilters({
  onSearch,
  onPriceFilter,
  onGetSuggestions,
  loading,
  suggestionsLoading,
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handlePriceChange = (index: number) => {
    setSelectedPriceRange(index);
    const range = priceRanges[index];
    onPriceFilter(range.min, range.max);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 flex flex-col md:items-end gap-4">
          <form onSubmit={handleSearch} className="flex-1 w-full">
            <div className="flex space-x-2">
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              <Button type="submit" loading={loading} className="px-4">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </form>
          <div className="md:col-span-1 flex items-end w-full">
            <Tooltip>
              <TooltipTrigger asChild className="w-full">
                <div>
                  <Button
                    onClick={onGetSuggestions}
                    variant="secondary"
                    loading={suggestionsLoading}
                    className="w-full"
                  >
                    <Wand2 className="w-5 h-5 mr-2" />
                    Get Smart Suggestions
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Suggests courses with:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Same category (Programming, Design, etc.)</li>
                  <li>
                    Same difficulty level (Beginner, Intermediate, Advanced)
                  </li>
                  <li>Similar price range (±30% of average)</li>
                  <li>High ratings for quality assurance</li>
                  <li>
                    Updates in real-time based on user interactions (Favorite,
                    View Details)
                  </li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="md:col-span-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handlePriceChange(index)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedPriceRange === index
                      ? "bg-pink-100 border-pink-300 text-pink-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
