"use client";

import { cn } from "@/lib/utils";
import { Bell, GraduationCap, ShoppingCart, User } from "lucide-react"; // Import Lucide icons
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Favorites", href: "/favorites" },
  { name: "Recently Viewed", href: "/recently-viewed" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />{" "}
                {/* Replace ri-graduation-cap-line */}
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                EduMarket
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                  pathname === item.href
                    ? "text-pink-600 border-b-2 border-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-pink-600 transition-colors cursor-pointer">
              <Bell className="w-5 h-5" /> {/* Replace ri-notification-line */}
            </button>
            <button className="p-2 text-gray-600 hover:text-pink-600 transition-colors cursor-pointer">
              <ShoppingCart className="w-5 h-5" />{" "}
              {/* Replace ri-shopping-cart-line */}
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5 text-white" />{" "}
              {/* Replace ri-user-line */}
            </div>
          </div>
        </div>

        <nav className="md:hidden pb-4">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                  pathname === item.href
                    ? "bg-pink-100 text-pink-600"
                    : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
