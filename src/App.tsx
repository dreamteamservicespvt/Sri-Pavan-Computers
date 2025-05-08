
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
import Dashboard from '@/pages/admin/Dashboard'
import AdminLayout from '@/components/admin/AdminLayout'
import { CartProvider } from './hooks/use-cart'
import { AuthProvider } from './hooks/use-auth'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from '@/components/ui/toaster'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiresAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              {/* Add more admin routes here */}
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
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
