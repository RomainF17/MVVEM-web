import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedHeadline } from './AnimatedHeadline';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 pb-10 md:pb-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.1fr] lg:grid-cols-[1fr_1.25fr] gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left column — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            <AnimatedHeadline
              as="h1"
              trigger="mount"
              delay={0.3}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-display font-semibold text-neutral-900 leading-[1.05] tracking-tight mb-6"
              segments={[
                { text: 'La' },
                { text: 'végétalisation', className: 'text-emerald-600' },
                { lineBreak: true, breakpoint: 'md' },
                { text: 'à portée de main' },
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg lg:text-xl text-neutral-600 mb-8 md:mb-10 max-w-xl leading-relaxed"
            >
              Construisons ensemble les villes de demain.
              <span className="block text-neutral-900 font-medium mt-1">Plus vertes, plus solidaires, plus humaines.</span>
            </motion.p>

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
          </motion.div>

          {/* Right column — mockup (centered on mobile, right-aligned on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center md:justify-end -mt-2 md:mt-0"
          >
            <img
              src="/images/mokcupmobile.png"
              alt="Aperçu de l'application Ma Ville Verte et Moi"
              className="w-[480px] sm:w-[540px] md:w-[540px] lg:w-[680px] h-auto mix-blend-multiply max-w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
