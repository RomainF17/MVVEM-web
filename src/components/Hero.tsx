import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';

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
          className="relative hidden md:block"
        >
          <div className="relative z-10 aspect-[4/5] max-w-md mx-auto">
             {/* Abstract City Representation */}
             <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/10 rounded-[3rem] backdrop-blur-sm border border-white/50 shadow-2xl overflow-hidden">
               {/* Decorative city elements */}
               <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent"></div>
               
               {/* Main visual - can be replaced with app screenshot */}
               <div className="absolute inset-4 rounded-[2.5rem] bg-white shadow-inner overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1518005020951-ecc8e5213891?q=80&w=2969&auto=format&fit=crop')] bg-cover">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                    <Leaf className="w-8 h-8 mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">Ma Ville Verte</h3>
                    <p className="text-white/80 text-sm">Découvrez les initiatives autour de vous.</p>
                  </div>
               </div>
             </div>

             {/* Floating cards */}
             <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-20 bg-white p-4 rounded-2xl shadow-xl max-w-[200px]"
             >
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                   <Leaf size={16} />
                 </div>
                 <div>
                   <div className="text-xs text-gray-500">Nouvelle initiative</div>
                   <div className="font-bold text-sm text-secondary">Mur Végétal</div>
                 </div>
               </div>
               <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full w-3/4 bg-primary"></div>
               </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
