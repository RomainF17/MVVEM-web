import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, Download } from 'lucide-react';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { Team } from './components/Team';
import { Footer } from './components/Footer';

const navLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Fonctionnalités", href: "#features" },
  { label: "Équipe", href: "#team" },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/25"
              >
                <Leaf className="w-6 h-6" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-xl text-secondary tracking-tight">Ma Ville Verte</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="relative px-5 py-2.5 text-sm font-semibold text-secondary/70 hover:text-secondary transition-colors rounded-full hover:bg-secondary/5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary to-emerald-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:shadow-glow transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Télécharger
              </motion.button>

              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-secondary" />
                ) : (
                  <Menu className="w-5 h-5 text-secondary" />
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
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
            >
              <div className="container mx-auto px-6 py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-secondary font-semibold rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-emerald-500 text-white px-6 py-4 rounded-xl font-bold hover:shadow-glow transition-all"
                >
                  <Download className="w-5 h-5" />
                  Télécharger l'application
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main>
        <Hero />
        <Mission />
        <Stats />
        <Features />
        <Team />
      </main>

      <Footer />
    </div>
  )
}

export default App
