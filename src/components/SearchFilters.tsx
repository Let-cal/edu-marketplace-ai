"use client";

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
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" loading={loading} className="px-4">
              <Search className="w-5 h-5" />
            </Button>
          </form>
        </div>

        <div className="md:col-span-1">
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

        <div className="md:col-span-1 flex items-end">
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
      </div>
    </div>
  );
}
