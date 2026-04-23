import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, Download, Settings, Newspaper, ShoppingBag, Star, Smartphone } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ShopPage } from './pages/ShopPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { AppPage } from './pages/AppPage';
import { Footer } from './components/Footer';

const navLinks = [
  { label: "Articles", to: "/articles", icon: Newspaper },
  { label: "Boutique", to: "/boutique", icon: ShoppingBag },
  { label: "Recommandations", to: "/recommandations", icon: Star },
  { label: "Application", to: "/application", icon: Smartphone },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed w-full z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/60'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <Leaf className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-semibold text-lg text-neutral-900 tracking-tight">Ma Ville Verte</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              <a
                href="/admin.html"
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                title="Administration"
              >
                <Settings className="w-4 h-4" />
              </a>
              <button
                className="hidden sm:inline-flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-neutral-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Télécharger
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-neutral-900" />
                ) : (
                  <Menu className="w-5 h-5 text-neutral-900" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-white border-t border-neutral-200/60 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:text-neutral-900 font-medium rounded-xl hover:bg-neutral-100 transition-colors"
                  >
                    <link.icon className="w-5 h-5 text-neutral-500" />
                    {link.label}
                  </Link>
                ))}
                <button
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-neutral-900 text-white px-6 py-3.5 rounded-full font-medium hover:bg-neutral-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Télécharger l'application
                </button>
                <a
                  href="/admin.html"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 border border-neutral-200 text-neutral-700 px-6 py-3 rounded-full font-medium hover:bg-neutral-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Administration
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/boutique" element={<ShopPage />} />
          <Route path="/recommandations" element={<RecommendationsPage />} />
          <Route path="/application" element={<AppPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
