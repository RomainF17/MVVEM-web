import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Mission } from '../components/Mission';
import { Stats } from '../components/Stats';
import { JoinCTA } from '../components/JoinCTA';

export function AppPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back button - fixed */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-24 left-6 z-40"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-600 hover:text-emerald-600 transition-colors font-medium border border-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
          Accueil
        </Link>
      </motion.div>

      <Hero />
      <Features />
      <Mission />
      <Stats />
      <JoinCTA />
    </div>
  );
}
