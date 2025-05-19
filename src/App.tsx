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

// Import admin pages with more explicit paths
import Dashboard from './pages/admin/Dashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import TeamAdmin from './pages/admin/TeamAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import BrandsAdmin from './pages/admin/BrandsAdmin';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import MessagesAdmin from './pages/admin/MessagesAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import AdminLogin from './pages/admin/AdminLogin'; // Make sure this import is added
import AnalyticsAdmin from './pages/admin/AnalyticsAdmin'; // Add this import

import AdminLayout from '@/components/admin/AdminLayout';

// Create AppContent component to use router hooks
const AppContent = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Enhanced loading with smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3200); // Extend loading time slightly for complete animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop />
      {/* Enhanced loading screen with transition */}
      <div className={`fixed inset-0 z-50 bg-gradient-to-b from-gray-50 to-blue-50 transition-opacity duration-500 ${isInitialLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <LoadingScreen />
      </div>
      
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiresAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<AnalyticsAdmin />} /> {/* Add this line */}
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
      </Suspense>
      <Toaster />
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Control loading state
  useEffect(() => {
    // Simulate or track actual resources loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Show loading screen conditionally */}
          {isLoading && <LoadingScreen />}
          
          {/* Only render the rest of the app after loading completes */}
          {!isLoading && (
            <>
              <ScrollToTop />
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} /> {/* Add this route */}
                <Route path="/admin" element={
                  <ProtectedRoute requiresAdmin={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="analytics" element={<AnalyticsAdmin />} /> {/* Add this line */}
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
              <Toaster />
            </>
          )}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
