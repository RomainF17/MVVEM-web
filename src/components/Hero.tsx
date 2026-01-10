import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:flex justify-center"
        >
           {/* Phone (static, no rotation/hover) */}
           <div className="relative w-[320px] h-[640px] bg-secondary rounded-[3rem] border-8 border-secondary shadow-2xl overflow-hidden ring-4 ring-secondary/10">
             {/* Status Bar */}
             <div className="absolute top-0 w-full h-8 bg-secondary z-20 flex justify-between px-6 items-center">
               <div className="w-12 h-4 bg-black/20 rounded-full mx-auto" />
             </div>

             {/* Screen Content - Image */}
             <div className="w-full h-full bg-white pt-8 flex items-center justify-center">
               <img
                 src="/images/hero-app.PNG"
                 alt="Ma Ville Verte App"
                 className="w-full h-full object-contain"
                 onError={(e) => {
                   // Fallback visual if image missing
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-primary/10', 'to-blue-100/40');
                 }}
               />

               {/* Fallback Content (visible only if image fails to load) */}
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 -z-10">
                 <p className="text-secondary/50 font-medium">Capture d'écran de l'accueil ici</p>
                 <p className="text-xs text-secondary/30 mt-2">/images/hero-app.PNG</p>
               </div>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
