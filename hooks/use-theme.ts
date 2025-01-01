"use client";

// import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/utils";

export function useTheme() {
  // const { theme } = useThemeStore();
  type Spacing = "compact" | "comfortable" | "spacious";
  type BorderRadius = "none" | "sm" | "md" | "lg" | "full";

  const theme: { spacing: Spacing; borderRadius: BorderRadius; colors: { primary: { value: string }; background: string; text: string; border: string }; fonts: { heading: string; body: string } } = {
    spacing: "comfortable",
    borderRadius: "md",
    colors: {
      primary: { value: "#2563EB" },
      background: "#F9FAFB",
      text: "#1E293B",
      border: "#D1D5DB"
    },
    fonts: {
      heading: "Inter",
      body: "Inter"
    }
  };

  const getFieldClasses = () => {
    const spacingClasses = {
      compact: "space-y-3",
      comfortable: "space-y-6",
      spacious: "space-y-8"
    };

    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full"
    };

    return {
      form: cn(
        "w-full",
        spacingClasses[theme.spacing]
      ),
      input: cn(
        "w-full",
        "border",
        radiusClasses[theme.borderRadius],
        "transition-colors",
        "focus:outline-none focus:ring-2",
        {
          "px-3 py-2": theme.spacing === "compact",
          "px-4 py-2.5": theme.spacing === "comfortable",
          "px-4 py-3": theme.spacing === "spacious"
        }
      ),
      button: cn(
        radiusClasses[theme.borderRadius],
        "transition-colors",
        {
          "px-4 py-2": theme.spacing === "compact",
          "px-5 py-2.5": theme.spacing === "comfortable",
          "px-6 py-3": theme.spacing === "spacious"
        }
      )
    };
  };

  const getThemeStyles = () => ({
    colors: {
      primary: theme.colors.primary.value,
      background: theme.colors.background,
      text: theme.colors.text,
      border: theme.colors.border
    },
    fonts: {
      heading: theme.fonts.heading,
      body: theme.fonts.body
    }
  });

  return {
    theme,
    getFieldClasses,
    getThemeStyles
  };
}