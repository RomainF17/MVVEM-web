import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-32 pb-16 md:pb-24 bg-white">
      {/* Background image with integrated phone mockup (desktop) */}
      <div
        className="hidden md:block absolute inset-0 bg-no-repeat bg-right bg-contain pointer-events-none"
        style={{ backgroundImage: 'url(/images/backgroundhero.png)' }}
        aria-hidden
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Text Content - left aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left max-w-xl lg:max-w-2xl"
          >
            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-neutral-900 leading-[1.05] tracking-tight mb-6"
            >
              La <span className="text-emerald-600">végétalisation</span>
              <br className="hidden md:block" />
              {' '}à portée de main
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-xl text-neutral-600 mb-8 md:mb-10 max-w-xl leading-relaxed"
            >
              Construisons ensemble les villes de demain.
              <span className="block text-neutral-900 font-medium mt-1">Plus vertes, plus solidaires, plus humaines.</span>
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <button className="group bg-neutral-900 text-white px-7 py-3.5 rounded-full font-medium text-base transition-colors duration-200 hover:bg-neutral-800 flex items-center justify-center gap-2">
                <span>Découvrir l'App</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </motion.div>

            {/* Mobile image with integrated phone mockup */}
            <motion.img
              src="/images/backgroundhero.png"
              alt="Aperçu de l'application Ma Ville Verte et Moi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-10 w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
