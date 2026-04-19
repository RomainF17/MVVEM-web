import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Mission } from '../components/Mission';
import { Stats } from '../components/Stats';
import { Conviction } from '../components/Conviction';
import { JoinCTA } from '../components/JoinCTA';

export function AppPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back button - fixed */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-24 left-6 z-40"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-neutral-600 hover:text-neutral-900 transition-colors font-medium border border-neutral-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Accueil
        </Link>
      </motion.div>

      <Hero />
      <Stats />
      <Mission />
      <Features />
      <Conviction />
      <JoinCTA />
    </div>
  );
}
