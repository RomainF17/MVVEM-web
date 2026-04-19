import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const Mission = () => {
  return (
    <section id="mission" className="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Quote icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mb-10">
            <Quote className="w-5 h-5" fill="currentColor" />
          </div>

          {/* Quote text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-neutral-900 leading-[1.25] tracking-tight mb-10 md:mb-12"
          >
            "De nombreuses villes rayonnent en France par leur engagement en faveur de l'environnement et de la protection de la <span className="text-emerald-600">biodiversité</span>."
          </motion.h2>

          {/* Description paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="space-y-5 md:space-y-6 text-base md:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto"
          >
            <p>
              Cette cause verte nous est particulièrement chère et nous serions fiers de pouvoir vous accompagner dans ce processus de transition afin d'offrir aux citoyens une ville{' '}
              <span className="text-neutral-900 font-medium">
                toujours plus respectueuse de la nature, plus solidaire et plus humaine.
              </span>
            </p>
            <p>
              Nous sommes persuadés, grâce à notre application, de pouvoir contribuer à ce{' '}
              <span className="text-neutral-900 font-medium">projet commun.</span>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
