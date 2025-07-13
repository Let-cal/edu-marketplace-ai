"use client";

import { productApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import Button from "./ui/Button";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  products?: Product[];
  timestamp: Date;
}

interface ChatBotProps {
  onViewDetails: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  favorites: Set<string>;
}

export default function ChatBot({
  onViewDetails,
  onToggleFavorite,
  favorites,
}: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your English learning advisor. Tell me what you'd like to learn and I'll recommend the perfect courses for you! 🎯",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const recommendations = await productApi.getChatRecommendations(
        inputValue
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          recommendations.length > 0
            ? `Great! I found ${recommendations.length} courses that match what you're looking for:`
            : "I couldn't find specific courses for that request, but here are some popular English courses you might like:",
        products: recommendations,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "Sorry, I'm having trouble finding recommendations right now. Please try again!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center cursor-pointer"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    English Learning Advisor
                  </h3>
                  <p className="text-sm text-gray-500">
                    AI-powered course recommendations
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-3xl ${
                      message.type === "user" ? "order-2" : "order-1"
                    }`}
                  >
                    <div
                      className={`p-4 rounded-2xl ${
                        message.type === "user"
                          ? "bg-pink-600 text-white ml-12"
                          : "bg-gray-100 text-gray-900 mr-12"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>

                    {message.products && message.products.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mr-12">
                        {message.products.map((product) => (
                          <div key={product.id} className="transform scale-95">
                            <ProductCard
                              product={product}
                              onViewDetails={onViewDetails}
                              onToggleFavorite={onToggleFavorite}
                              isFavorite={favorites.has(product.id)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl p-4 mr-12">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">
                        Finding courses for you...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tell me what you'd like to learn... (e.g., 'I want to improve my business English speaking skills')"
                  className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  rows={2}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="px-6 full self-end"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Try: &quot;conversational English&quot;, &quot;IELTS
                preparation&quot;, &quot;business English&quot;,
                &quot;pronunciation practice&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
