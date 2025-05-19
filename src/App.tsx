import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Index from '@/pages/Index'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Products from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import PCBuilder from '@/pages/PCBuilder'
import Brands from '@/pages/Brands'
import Gallery from '@/pages/Gallery'
import Contact from '@/pages/Contact'
import FAQs from '@/pages/FAQs'
import Testimonials from '@/pages/Testimonials'
import NotFound from '@/pages/NotFound'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import Terms from '@/pages/Terms'
import Cart from '@/pages/Cart'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import ForgotPassword from '@/pages/ForgotPassword'
import Profile from '@/pages/Profile'
import Unauthorized from '@/pages/Unauthorized'
import { CartProvider } from './hooks/use-cart'
import { AuthProvider } from './hooks/use-auth'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from '@/components/ui/toaster'
import './App.css'
import LoadingScreen from './components/ui/LoadingScreen'
import { useAuth } from './hooks/use-auth'

// Import admin pages with more explicit paths
import Dashboard from './pages/admin/Dashboard';
import AnalyticsAdmin from './pages/admin/AnalyticsAdmin';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import TeamAdmin from './pages/admin/TeamAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import BrandsAdmin from './pages/admin/BrandsAdmin';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import MessagesAdmin from './pages/admin/MessagesAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

import AdminLayout from '@/components/admin/AdminLayout';

// Import our new AdminLogin component
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent isInitialLoading={isLoading} setIsInitialLoading={setIsLoading} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Create AppContent component to use router hooks and auth state
const AppContent = ({ isInitialLoading, setIsInitialLoading }: { isInitialLoading: boolean, setIsInitialLoading: (val: boolean) => void }) => {
  const { loading: authLoading } = useAuth();
  
  // Wait for both app resources to load AND auth state to be determined
  const isAppLoading = isInitialLoading || authLoading;

  // Enhanced loading with smooth transition
  useEffect(() => {
    // Only consider resources loaded after minimum time AND auth is no longer loading
    if (!authLoading) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 1000); // Reduced loading time but still enough for animation

      return () => clearTimeout(timer);
    }
  }, [authLoading, setIsInitialLoading]);

  return (
    <>
      <ScrollToTop />
      {/* Enhanced loading screen with transition - show when either auth or resources are loading */}
      <div className={`fixed inset-0 z-50 bg-gradient-to-b from-gray-50 to-blue-50 transition-opacity duration-500 ${isAppLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <LoadingScreen />
      </div>
      
      <Suspense fallback={<LoadingScreen />}>
        {/* Only render routes once everything is loaded */}
        {!isAppLoading && (
          <Routes>
            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiresAdmin={true} adminRoute={true}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<AnalyticsAdmin />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="team" element={<TeamAdmin />} />
              <Route path="gallery" element={<GalleryAdmin />} />
              <Route path="brands" element={<BrandsAdmin />} />
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main className="pt-16">
                    <Profile />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            
            {/* Error Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <main>
                  <Index />
                </main>
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <About />
                </main>
                <Footer />
              </>
            } />
            <Route path="/services" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <Services />
                </main>
                <Footer />
              </>
            } />
            <Route path="/products" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <Products />
                </main>
                <Footer />
              </>
            } />
            <Route path="/products/:productId" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <ProductDetail />
                </main>
                <Footer />
              </>
            } />
            <Route path="/pc-builder" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <PCBuilder />
                </main>
                <Footer />
              </>
            } />
            <Route path="/brands" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <Brands />
                </main>
                <Footer />
              </>
            } />
            <Route path="/gallery" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <Gallery />
                </main>
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <Contact />
                </main>
                <Footer />
              </>
            } />
            <Route path="/faqs" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <FAQs />
                </main>
                <Footer />
              </>
            } />
            <Route path="/testimonials" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <Testimonials />
                </main>
                <Footer />
              </>
            } />
            <Route path="/privacy-policy" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <PrivacyPolicy />
                </main>
                <Footer />
              </>
            } />
            <Route path="/terms" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <Terms />
                </main>
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <Cart />
                </main>
                <Footer />
              </>
            } />
            <Route path="*" element={
              <>
                <Navbar />
                <main className="pt-16">
                  <NotFound />
                </main>
                <Footer />
              </>
            } />
          </Routes>
        )}
      </Suspense>
      <Toaster />
    </>
  );
};

export default App;
