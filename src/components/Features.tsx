import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Newspaper, Sprout, Flower2, Sparkles, CheckCircle2 } from 'lucide-react';
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
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50/50 via-teal-50/30 to-transparent",
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
    gradient: "from-lime-400 to-green-500",
    bgGradient: "from-lime-50/50 via-green-50/30 to-transparent",
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
    gradient: "from-blue-400 to-cyan-500",
    bgGradient: "from-blue-50/50 via-cyan-50/30 to-transparent",
    accentColor: "blue",
    points: [
      "Carte interactive",
      "Initiatives, ateliers, parcs & jardins",
      "Acteurs & dispositifs verts",
    ],
    image: "/images/feature-carte.png"
  },
  {
    id: "mes-plantes",
    title: "Mes Plantes",
    subtitle: "Prenez soin de vos plantes",
    description: [
      "L'onglet Mes Plantes vous permet d'enregistrer toutes vos plantes et de maîtriser leur arrosage grâce à des rappels personnalisés.",
      "Accédez à des fiches détaillées sur chaque espèce et identifiez vos plantes simplement en prenant une photo.",
    ],
    icon: Flower2,
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50/50 via-orange-50/30 to-transparent",
    accentColor: "amber",
    points: [
      "Enregistrer et gérer ses plantes",
      "Rappels d'arrosage personnalisés",
      "Fiches d'informations détaillées",
      "Reconnaissance d'espèces par photo",
    ],
    image: "/images/mes-plantes.PNG"
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.2 1", "0.8 0"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`relative grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${isEven ? '' : 'lg:grid-flow-dense'} py-12 md:py-24`}
    >
      {/* Background ambient glow for current feature */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-[3rem] -inset-x-8 -inset-y-8 opacity-20 pointer-events-none -mr-4 md:-mx-12`} />

      {/* Content */}
      <div className={`space-y-8 relative z-10 ${isEven ? '' : 'lg:col-start-2'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg flex items-center justify-center text-white
            transform transition-transform duration-500 hover:scale-110 hover:rotate-6`}>
            <feature.icon className="w-7 h-7" />
          </div>
          <span className={`text-xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent uppercase tracking-wider`}>
            {feature.title}
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-extrabold text-gray-900 leading-[1.1]"
        >
          {feature.subtitle}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5"
        >
          {feature.description.map((p, idx) => (
            <p key={idx} className="text-xl text-gray-600 leading-relaxed font-medium">
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6"
        >
          <ul className="grid sm:grid-cols-2 gap-4">
            {feature.points.map((point, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-800 font-semibold"
              >
                <div className={`mt-1 bg-gradient-to-br ${feature.gradient} rounded-full p-1`}>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="leading-snug">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Phone mockup container */}
      <motion.div
        className={`relative flex justify-center items-center ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-[120%] h-[120%] bg-gradient-to-br ${feature.gradient} blur-[60px] opacity-[0.10] rounded-full`} />
        </div>

        <motion.div
          style={{ y }}
          className="relative z-10"
        >
          {/* Glassmorphic pedestal for phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[680px] bg-white/40 backdrop-blur-2xl rounded-[3.5rem] border border-white/60 shadow-2xl skew-x-[-2deg] skew-y-[2deg]" />

          <motion.div
            whileHover={{ scale: 1.03, rotate: 0 }}
            initial={{ rotate: isEven ? -2 : 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <PhoneMockup
              src={feature.image}
              alt={`Interface ${feature.title}`}
              className={`w-[280px] lg:w-[320px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)] filter saturate-110`}
            />

            {/* Floating visual decorators based on feature */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className={`absolute -right-10 top-20 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-xl flex items-center justify-center p-4 backdrop-blur-md bg-opacity-90 hidden md:flex hover:scale-110 transition-transform cursor-pointer`}
            >
              <feature.icon className="w-full h-full text-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <section id="features" className="py-32 px-6 relative bg-gray-50/50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-700 font-bold text-sm tracking-wider uppercase mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            L'Application
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-display font-extrabold text-gray-900 mb-8 leading-[1.1]">
            Des fonctionnalités pour{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">agir ensemble</span>
            </span>
          </h2>

          <p className="text-2xl text-gray-600 leading-relaxed font-medium">
            Découvrez tous les outils à votre disposition pour participer activement à la transition écologique de votre ville et au quotidien.
          </p>
        </motion.div>

        {/* Features list */}
        <div className="space-y-12">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
