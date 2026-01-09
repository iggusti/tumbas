import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import AboutBatikIndramayuPage from "./pages/AboutBatikIndramayuPage";
import AboutShopPage from "./pages/AboutShopPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import CustomerServicePage from "./pages/CustomerServicePage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import MyAccountPage from "./pages/MyAccountPage";
import MyAddressPage from "./pages/MyAddressPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import NotFound from "./pages/NotFound";
import NotificationPage from "./pages/NotificationPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage";
import PromoCodePage from "./pages/PromoCodePage";
import RecentlyViewedPage from "./pages/RecentlyViewedPage";
import SearchPage from "./pages/SearchPage";
import SplashScreen from "./components/SplashScreen";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { AddressProvider } from "@/contexts/AddressContext";
import { ProfileProvider } from "@/contexts/ProfileContext";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <AddressProvider>
          <CartProvider>
            <FavoritesProvider>
              <RecentlyViewedProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <SplashScreen isVisible={showSplash} />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about-shop" element={<AboutShopPage />} />
                      <Route path="/about-batik-indramayu" element={<AboutBatikIndramayuPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/notification" element={<NotificationPage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/my-account" element={<MyAccountPage />} />
                      <Route path="/my-address" element={<MyAddressPage />} />
                      <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                      <Route path="/my-orders" element={<MyOrdersPage />} />
                      <Route path="/promo-code" element={<PromoCodePage />} />
                      <Route path="/customer-service" element={<CustomerServicePage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/favorites" element={<FavoritesPage />} />
                      <Route path="/recently-viewed" element={<RecentlyViewedPage />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </RecentlyViewedProvider>
            </FavoritesProvider>
          </CartProvider>
        </AddressProvider>
      </ProfileProvider>
    </QueryClientProvider>
  );
};

export default App;
