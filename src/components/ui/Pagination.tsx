"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return pages;
    }

    if (currentPage <= 4) {
      return [...pages.slice(0, 5), "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, "...", ...pages.slice(totalPages - 5)];
    }

    return [
      1,
      "...",
      ...pages.slice(currentPage - 2, currentPage + 1),
      "...",
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {visiblePages.map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="inline-flex items-center justify-center w-10 h-10 text-gray-500">
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 rounded-lg border transition-colors cursor-pointer whitespace-nowrap",
                page === currentPage
                  ? "bg-pink-600 text-white border-pink-600 hover:bg-pink-700"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {page}
            </button>
          )}
        </div>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />{" "}
        {/* Replace ri-arrow-right-s-line */}
      </button>
    </nav>
  );
}
