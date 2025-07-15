"use client";

import {
  BarChart2,
  DollarSign,
  Filter,
  Folder,
  MessageCircle,
  Search,
  Settings,
  Star,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import Button from "./ui/Button";
import { Checkbox } from "./ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Input from "./ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface FilterCriteria {
  search: string;
  categories: string[];
  levels: string[];
  priceRange: { min: number; max: number };
  minRating: number;
  reviewCountRange: string;
  instructors: string[];
}

interface SearchFiltersProps {
  onFiltersChange: (filters: FilterCriteria) => void;
  onGetSuggestions: () => void;
  loading?: boolean;
  suggestionsLoading?: boolean;
  availableCategories?: string[];
  availableInstructors?: string[];
}

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under 500K", min: 0, max: 500000 },
  { label: "500K - 1M", min: 500000, max: 1000000 },
  { label: "Over 1M", min: 1000000, max: Infinity },
];

const ratingOptions = [
  { label: "All Ratings", value: 0 },
  { label: "3★ & above", value: 3 },
  { label: "4★ & above", value: 4 },
  { label: "4.5★ & above", value: 4.5 },
  { label: "5★ only", value: 5 },
];

const reviewCountRanges = [
  { label: "All Reviews", value: "all" },
  { label: "Over 500 reviews", value: "500+" },
  { label: "100-500 reviews", value: "100-500" },
  { label: "Under 100 reviews", value: "<100" },
];

const levelOptions = ["Beginner", "Intermediate", "Advanced"];

export default function SearchFilters({
  onFiltersChange,
  onGetSuggestions,
  loading,
  suggestionsLoading,
  availableCategories = [],
  availableInstructors = [],
}: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    search: "",
    categories: [],
    levels: [],
    priceRange: { min: 0, max: Infinity },
    minRating: 0,
    reviewCountRange: "all",
    instructors: [],
  });

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  const updateFilters = (newFilters: Partial<FilterCriteria>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: filters.search });
  };

  const handlePriceChange = (index: number) => {
    setSelectedPriceRange(index);
    const range = priceRanges[index];
    updateFilters({ priceRange: { min: range.min, max: range.max } });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const handleLevelToggle = (level: string) => {
    const newLevels = filters.levels.includes(level)
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level];
    updateFilters({ levels: newLevels });
  };

  const handleInstructorToggle = (instructor: string) => {
    const newInstructors = filters.instructors.includes(instructor)
      ? filters.instructors.filter((i) => i !== instructor)
      : [...filters.instructors, instructor];
    updateFilters({ instructors: newInstructors });
  };

  const clearAllFilters = () => {
    const resetFilters: FilterCriteria = {
      search: "",
      categories: [],
      levels: [],
      priceRange: { min: 0, max: Infinity },
      minRating: 0,
      reviewCountRange: "all",
      instructors: [],
    };
    setFilters(resetFilters);
    setSelectedPriceRange(0);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters =
    filters.search ||
    filters.categories.length > 0 ||
    filters.levels.length > 0 ||
    selectedPriceRange > 0 ||
    filters.minRating > 0 ||
    filters.reviewCountRange !== "all" ||
    filters.instructors.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
      {/* Main Search Row */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="flex-1">
                <Input
                  placeholder="Search courses..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <Button type="submit" loading={loading} className="px-4">
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>

          <div className="md:col-span-1">
            <Button
              onClick={onGetSuggestions}
              variant="secondary"
              loading={suggestionsLoading}
              className="w-full"
            >
              <i className="ri-magic-line mr-2"></i>
              Smart Suggestions
            </Button>
          </div>

          <div className="md:col-span-1">
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter
                    className={`w-5 h-5 mr-2 transition-transform ${
                      isAdvancedOpen ? "rotate-180" : ""
                    }`}
                  />
                  Advanced Filters
                  {hasActiveFilters && (
                    <span className="ml-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                      •
                    </span>
                  )}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleContent className="border-b border-gray-100">
          <div className="p-6 space-y-6">
            {/* Filter Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-pink-600" />
                Filter Options
              </h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <DollarSign className="w-4 h-4 mr-1 inline" />
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => handlePriceChange(index)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          selectedPriceRange === index
                            ? "bg-pink-100 border-pink-300 text-pink-700 shadow-sm"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Star className="w-4 h-4 mr-1 inline" />
                    Minimum Rating
                  </label>
                  <Select
                    value={filters.minRating.toString()}
                    onValueChange={(value) =>
                      updateFilters({ minRating: parseFloat(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {ratingOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Folder className="w-4 h-4 mr-1 inline" />
                    Categories ({filters.categories.length} selected)
                  </label>
                  <div className="max-h-40 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3">
                    {availableCategories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <Checkbox
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <span className="text-sm text-gray-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Review Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <MessageCircle className="w-4 h-4 mr-1 inline" />
                    Review Count
                  </label>
                  <Select
                    value={filters.reviewCountRange}
                    onValueChange={(value) =>
                      updateFilters({ reviewCountRange: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select review range" />
                    </SelectTrigger>
                    <SelectContent>
                      {reviewCountRanges.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Levels */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <BarChart2 className="w-4 h-4 mr-1 inline" />
                    Difficulty Level ({filters.levels.length} selected)
                  </label>
                  <div className="space-y-2">
                    {levelOptions.map((level) => (
                      <label
                        key={level}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <Checkbox
                          checked={filters.levels.includes(level)}
                          onCheckedChange={() => handleLevelToggle(level)}
                        />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Instructors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <User className="w-4 h-4 mr-1 inline" />
                    Instructors ({filters.instructors.length} selected)
                  </label>
                  <div className="max-h-40 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3">
                    {availableInstructors.map((instructor) => (
                      <label
                        key={instructor}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <Checkbox
                          checked={filters.instructors.includes(instructor)}
                          onCheckedChange={() =>
                            handleInstructorToggle(instructor)
                          }
                        />
                        <span className="text-sm text-gray-700">
                          {instructor}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600 mr-2">
                    Active filters:
                  </span>

                  {filters.search && (
                    <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs flex items-center">
                      Search: &quot;{filters.search}&quot;
                      <button
                        onClick={() => updateFilters({ search: "" })}
                        className="ml-1 hover:bg-pink-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {filters.categories.map((category) => (
                    <span
                      key={category}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center"
                    >
                      {category}
                      <button
                        onClick={() => handleCategoryToggle(category)}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  ))}

                  {filters.levels.map((level) => (
                    <span
                      key={level}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center"
                    >
                      {level}
                      <button
                        onClick={() => handleLevelToggle(level)}
                        className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  ))}

                  {selectedPriceRange > 0 && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs flex items-center">
                      {priceRanges[selectedPriceRange].label}
                      <button
                        onClick={() => handlePriceChange(0)}
                        className="ml-1 hover:bg-yellow-200 rounded-full p-0.5"
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  )}

                  {filters.minRating > 0 && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center">
                      {
                        ratingOptions.find((r) => r.value === filters.minRating)
                          ?.label
                      }
                      <button
                        onClick={() => updateFilters({ minRating: 0 })}
                        className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
