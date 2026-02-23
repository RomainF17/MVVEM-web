import { motion } from 'framer-motion';
import { Quote, Leaf, Sparkles } from 'lucide-react';

export const Mission = () => {
  return (
    <section id="mission" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Absolute massive background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[200px] md:text-[300px] font-display font-bold text-emerald-900 leading-none whitespace-nowrap">MISSION</h2>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-20 text-emerald-500/10 hidden lg:block"
      >
        <Leaf className="w-32 h-32" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-20 text-teal-500/15 hidden lg:block"
      >
        <Sparkles className="w-24 h-24" />
      </motion.div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Super Premium Card with heavy glassmorphism */}
          <div className="relative bg-white/60 backdrop-blur-3xl rounded-[3rem] p-12 md:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden group hover:shadow-[0_20px_60px_rgb(16,185,129,0.08)] transition-all duration-700">
            {/* Elegant Background Gradients inside card */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400/10 to-teal-400/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-500/10 to-emerald-400/5 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10">
              {/* Massive background quote mark */}
              <div className="absolute -top-10 -left-6 text-emerald-100 opacity-50 z-0">
                <Quote className="w-48 h-48 rotate-180" fill="currentColor" />
              </div>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/30 mb-10"
              >
                <Quote className="w-10 h-10" fill="white" />
              </motion.div>

              {/* Quote text */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-gray-900 mb-10 leading-[1.3] tracking-tight"
              >
                "De nombreuses villes rayonnent en France par leur engagement en faveur de l'environnement et de la protection de la{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">biodiversité</span>."
              </motion.h2>

              {/* Description paragraphs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 space-y-6 text-xl md:text-2xl text-gray-600 leading-relaxed font-medium max-w-4xl"
              >
                <p>
                  Cette cause verte nous est particulièrement chère et nous serions fiers de pouvoir vous accompagner dans ce processus de transition afin d'offrir aux citoyens une ville{' '}
                  <strong className="text-gray-900 font-bold bg-emerald-100 rounded-lg px-2 py-0.5">
                    toujours plus respectueuse de la nature, plus solidaire et plus humaine.
                  </strong>
                </p>
                <p>
                  Nous sommes persuadés, grâce à notre application, de pouvoir contribuer à ce{' '}
                  <strong className="text-gray-900 font-bold bg-teal-100 rounded-lg px-2 py-0.5">projet commun.</strong>
                </p>
              </motion.div>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 mt-14 pt-10 border-t border-gray-200 flex items-center justify-between flex-wrap gap-6"
              >
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {['A', 'J', 'M', 'R'].map((initial, i) => (
                      <div
                        key={initial}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-[3px] border-white flex items-center justify-center text-white font-black text-lg shadow-lg"
                        style={{ zIndex: 4 - i }}
                      >
                        {initial}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">L'équipe Ma Ville Verte</p>
                    <p className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mt-0.5">Fondateurs & Passionnés</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
