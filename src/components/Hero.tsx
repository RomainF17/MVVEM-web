import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-start md:items-center">
      {/* Background blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[80px] -z-10"></div>

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-secondary/10 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-secondary/70">Application Mobile Citoyenne</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6 leading-[1.1] font-display font-bold text-secondary">
            La <span className="text-primary relative inline-block">
              végétalisation
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span><br />
            à portée de main
          </h1>
          
          <p className="text-lg md:text-xl text-secondary/80 mb-8 max-w-lg leading-relaxed">
            Construisons ensemble les villes de demain. Plus vertes, plus solidaires, plus humaines.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-secondary text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
              Découvrir l'App <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white border-2 border-secondary/10 text-secondary px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary/5 hover:border-secondary transition-all">
              Voir la vidéo
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-sm text-secondary/60">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
              ))}
            </div>
            <p>Rejoint par +2000 citoyens</p>
          </div>

          {/* Mobile: show the hero phone below CTAs (desktop unchanged) */}
          <div className="md:hidden mt-10 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-[260px] max-w-[85vw]"
            >
              <PhoneMockup
                src="/images/hero-app.PNG"
                alt="Aperçu de l'application Ma Ville Verte et Moi"
                className="w-full"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:flex justify-center"
        >
          <PhoneMockup
            src="/images/hero-app.PNG"
            alt="Aperçu de l'application Ma Ville Verte et Moi"
            className="w-[320px] lg:w-[360px]"
          />
        </motion.div>
      </div>
    </section>
  );
};
