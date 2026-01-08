import React, { createContext, useContext, useState, ReactNode } from "react";

interface RecentlyViewedContextType {
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
  // Default 1 recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(["2"]);

  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists to move to front
      const filtered = prev.filter((id) => id !== productId);
      // Add to front, limit to 20 items
      return [productId, ...filtered].slice(0, 20);
    });
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  }
  return context;
};
