import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export const Mission = () => {
  return (
    <section id="mission" className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-background rounded-[2rem] p-8 md:p-12 shadow-xl relative border border-secondary/5"
        >
          <Quote className="w-12 h-12 text-secondary mb-6 opacity-80" />
          
          <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-6 leading-relaxed">
            "De nombreuses villes rayonnent en France par leur engagement en faveur de l'environnement et de la protection de la biodiversité."
          </h2>
          
          <div className="space-y-4 text-lg text-secondary/80 leading-relaxed">
            <p>
              Cette cause verte nous est particulièrement chère et nous serions fiers de pouvoir vous accompagner dans ce processus de transition afin d'offrir aux citoyens une ville <strong className="text-secondary font-bold">toujours plus respectueuse de la nature, plus solidaire et plus humaine.</strong>
            </p>
            <p>
              Nous sommes persuadés, grâce à notre application, de pouvoir contribuer à ce <strong className="text-secondary font-bold">projet commun.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
