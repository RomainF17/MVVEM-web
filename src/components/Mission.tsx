import { motion } from 'framer-motion';
import { Quote, Leaf, Sparkles } from 'lucide-react';

export const Mission = () => {
  return (
    <section id="mission" className="py-24 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 mesh-bg opacity-50" />
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 text-primary/20 hidden lg:block"
      >
        <Leaf className="w-24 h-24" />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-20 text-emerald-400/15 hidden lg:block"
      >
        <Sparkles className="w-16 h-16" />
      </motion.div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Card with glassmorphism */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 shadow-2xl border border-white/50 overflow-hidden">
            {/* Gradient accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-emerald-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Quote icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 text-white shadow-lg shadow-primary/30 mb-8"
              >
                <Quote className="w-8 h-8" />
              </motion.div>
              
              {/* Quote text */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-secondary mb-8 leading-relaxed"
              >
                "De nombreuses villes rayonnent en France par leur engagement en faveur de l'environnement et de la protection de la{' '}
                <span className="gradient-text">biodiversité</span>."
              </motion.h2>
              
              {/* Description paragraphs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-6 text-lg md:text-xl text-secondary/70 leading-relaxed"
              >
                <p>
                  Cette cause verte nous est particulièrement chère et nous serions fiers de pouvoir vous accompagner dans ce processus de transition afin d'offrir aux citoyens une ville{' '}
                  <strong className="text-secondary font-bold bg-primary/10 px-2 py-0.5 rounded-md">
                    toujours plus respectueuse de la nature, plus solidaire et plus humaine.
                  </strong>
                </p>
                <p>
                  Nous sommes persuadés, grâce à notre application, de pouvoir contribuer à ce{' '}
                  <strong className="text-secondary font-bold bg-primary/10 px-2 py-0.5 rounded-md">projet commun.</strong>
                </p>
              </motion.div>
              
              {/* Signature */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-10 pt-8 border-t border-secondary/10 flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  {['A', 'J', 'M', 'R'].map((initial, i) => (
                    <div 
                      key={initial}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md"
                      style={{ zIndex: 4 - i }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-secondary">L'équipe Ma Ville Verte</p>
                  <p className="text-sm text-secondary/60">Fondateurs & Passionnés</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
