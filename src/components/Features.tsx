import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Newspaper, Sprout, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { useRef } from 'react';

const features = [
  {
    id: "informer",
    title: "Informer",
    subtitle: "Restez connecté à l'actualité verte",
    description: [
      "La page Infos permet d'informer l'utilisateur de l'actualité verte de sa commune et de le sensibiliser à la nature et au respect des pratiques de développement durable.",
      "Un fil d'actualité affiche l'initiative et l'actualité se déroulant près de chez vous.",
    ],
    icon: Newspaper,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 via-teal-50/50 to-white",
    accentColor: "emerald",
    points: [
      "Fil d'actualité près de chez vous",
      "Dossiers & thématiques",
      "Dispositifs & réglementations",
      "Astuces & aménagements responsables",
    ],
    image: "/images/feature-informer.PNG"
  },
  {
    id: "echanger",
    title: "Échanger & proposer",
    subtitle: "Créez et partagez vos initiatives",
    description: [
      "Chaque membre de la communauté pourra créer et proposer une initiative verte qui pourra se dérouler dans sa ville à un temps donné.",
      "Celle-ci pourra être vue par tous les utilisateurs de l'application qui pourront faire le choix d'y participer, de la suivre et/ou de la partager.",
    ],
    icon: Sprout,
    gradient: "from-lime-500 to-green-500",
    bgGradient: "from-lime-50 via-green-50/50 to-white",
    accentColor: "lime",
    points: [
      "Créer une initiative verte",
      "Participer, suivre, partager",
      "Rencontrer & fédérer les voisins",
    ],
    image: "/images/feature-echanger.PNG"
  },
  {
    id: "carte",
    title: "Géolocalisation",
    subtitle: "Explorez les actions autour de vous",
    description: [
      "Sur la carte sont répertoriés : les initiatives de végétalisation, les ateliers de sensibilisation à la nature, les parcs et jardins, les jardineries et fleuristes.",
      "Ainsi que tous les acteurs et dispositifs verts (fermes pédagogiques, jardins partagés, producteurs locaux biologiques, …).",
    ],
    icon: Map,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 via-cyan-50/50 to-white",
    accentColor: "blue",
    points: [
      "Carte interactive",
      "Initiatives, ateliers, parcs & jardins",
      "Acteurs & dispositifs verts",
    ],
    image: "/images/feature-carte.png"
  },
  {
    id: "soutenir",
    title: "Soutenir",
    subtitle: "Financez les projets innovants",
    description: [
      "L'onglet Financement participatif permet à des membres de la communauté de proposer et/ou soutenir des projets verts innovants nécessitant un apport financier et matériel plus important pour sa mise en place.",
    ],
    icon: HeartHandshake,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 via-orange-50/50 to-white",
    accentColor: "amber",
    points: [
      "Financement participatif communautaire",
      "Soutenir des projets verts innovants",
      "Suivi simple & transparent",
    ],
    image: "/images/feature-financer.PNG"
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}
    >
      {/* Content */}
      <div className={`space-y-8 ${isEven ? '' : 'lg:col-start-2'}`}>
        {/* Header badge */}
        <motion.div 
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}>
            <feature.icon className="w-6 h-6" />
            <span className="font-display font-bold text-lg">{feature.title}</span>
          </div>
        </motion.div>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-display font-bold text-secondary leading-tight"
        >
          {feature.subtitle}
        </motion.p>
        
        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="space-y-4 text-lg text-secondary/70 leading-relaxed"
        >
          {feature.description.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </motion.div>
        
        {/* Points */}
        <motion.ul 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {feature.points.map((point, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 text-secondary font-medium"
            >
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
              {point}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Phone mockup with parallax */}
      <motion.div 
        style={{ y }}
        className={`relative flex justify-center ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
      >
        {/* Background glow */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
          <div className={`w-80 h-80 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-[80px]`} />
        </div>
        
        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className={`w-[400px] h-[400px] rounded-full border border-dashed opacity-20`} 
               style={{ borderColor: feature.accentColor === 'emerald' ? '#10b981' : 
                                    feature.accentColor === 'lime' ? '#84cc16' :
                                    feature.accentColor === 'blue' ? '#3b82f6' : '#f59e0b' }} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: isEven ? -10 : 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          className="relative z-10"
        >
          <PhoneMockup
            src={feature.image}
            alt={`Interface ${feature.title}`}
            className="w-[280px] lg:w-[320px] drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-background" />
      
      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-4 h-4" />
            L'Application
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6">
            Des fonctionnalités pour{' '}
            <span className="gradient-text">agir</span>
          </h2>
          
          <p className="text-xl text-secondary/60 max-w-2xl mx-auto">
            Découvrez tous les outils à votre disposition pour participer activement à la transition écologique de votre ville.
          </p>
        </motion.div>

        {/* Features list */}
        <div className="space-y-32 lg:space-y-40">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
