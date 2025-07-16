"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-pink-200 group-[.toaster]:shadow-lg group-[.toaster]:backdrop-blur-sm group-[.toaster]:rounded-xl group-[.toaster]:border-2 group-[.toaster]:p-4",
          description: "group-[.toast]:text-gray-600",
          actionButton:
            "group-[.toast]:bg-pink-500 group-[.toast]:text-white group-[.toast]:hover:bg-pink-600 group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600 group-[.toast]:hover:bg-gray-200 group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors",
          closeButton:
            "group-[.toast]:bg-pink-50 group-[.toast]:text-pink-600 group-[.toast]:hover:bg-pink-100 group-[.toast]:border-pink-200 group-[.toast]:rounded-lg group-[.toast]:transition-colors",
          success:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-pink-50 group-[.toast]:to-rose-50 group-[.toast]:border-pink-300 group-[.toast]:text-pink-800",
          error:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-red-50 group-[.toast]:to-pink-50 group-[.toast]:border-red-300 group-[.toast]:text-red-800",
          info: "group-[.toast]:bg-gradient-to-r group-[.toast]:from-blue-50 group-[.toast]:to-purple-50 group-[.toast]:border-blue-300 group-[.toast]:text-blue-800",
          warning:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-yellow-50 group-[.toast]:to-orange-50 group-[.toast]:border-yellow-300 group-[.toast]:text-yellow-800",
        },
        duration: 4000,
      }}
      style={
        {
          "--normal-bg": "rgb(255 255 255 / 0.95)",
          "--normal-text": "rgb(17 24 39)",
          "--normal-border": "rgb(251 207 232)",
          "--success-bg": "rgb(254 242 242)",
          "--success-text": "rgb(190 24 93)",
          "--error-bg": "rgb(254 242 242)",
          "--error-text": "rgb(220 38 38)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
