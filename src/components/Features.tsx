import { motion, useScroll, useTransform, useSpring, useInView, type Variants } from 'framer-motion';
import { Map, Newspaper, Sprout, Flower2, Check, Sparkles } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { useRef } from 'react';

// Apple's signature easing — sourced from their public design specs
const APPLE_EASE = [0.16, 1, 0.3, 1] as const;
const APPLE_EASE_OUT = [0.32, 0.72, 0, 1] as const;

const features = [
  {
    id: "echanger",
    title: "Échanger & proposer",
    subtitle: "Créez et partagez vos initiatives",
    description: [
      "Chaque membre de la communauté pourra créer et proposer une initiative verte qui pourra se dérouler dans sa ville à un temps donné. Une initiative permet aussi bien de partager des connaissances que de s'organiser avec les gens de son quartier : la forme reste libre, place aux propositions. Ma Ville Verte est un espace ouvert pour vous permettre de créer votre propre vision de la ville verte.",
      "Celle-ci pourra être vue par tous les utilisateurs de l'application qui pourront faire le choix d'y participer, de la suivre et/ou de la partager.",
    ],
    icon: Sprout,
    points: [
      { label: "Créer une initiative verte" },
      { label: "Participer, suivre, partager" },
      { label: "Rencontrer & fédérer les voisins" },
    ],
    image: "/images/feature-echanger.PNG",
    bareImage: true
  },
  {
    id: "mes-plantes",
    title: "Mes Plantes",
    subtitle: "Prenez soin de vos plantes",
    description: [
      "L'onglet Mes Plantes vous accompagne au quotidien : enregistrez vos plantes, recevez des rappels d'arrosage personnalisés et consultez des fiches détaillées sur chaque espèce.",
      "Grâce à l'intelligence artificielle, identifiez vos plantes en prenant une photo et diagnostiquez les éventuels problèmes de santé pour savoir comment réagir.",
      "Partagez vos plantes avec vos amis et suivez ensemble leur évolution : qui les a arrosées, leur croissance, leurs petits soins du quotidien.",
    ],
    icon: Flower2,
    points: [
      { label: "Enregistrer et gérer ses plantes" },
      { label: "Rappels d'arrosage personnalisés" },
      { label: "Fiches d'informations détaillées" },
      { label: "Reconnaissance d'espèces par photo", ai: true },
      { label: "Diagnostic de la plante", ai: true },
      { label: "Partage entre amis & suivi collaboratif" },
    ],
    image: "/images/mes-plantes.PNG",
    bareImage: true
  },
  {
    id: "informer",
    title: "Informer",
    subtitle: "Restez connecté à l'actualité verte",
    description: [
      "La page Infos permet d'informer l'utilisateur de l'actualité verte de sa commune et de le sensibiliser à la nature et au respect des pratiques de développement durable.",
      "Un fil d'actualité affiche l'initiative et l'actualité se déroulant près de chez vous, avec des recommandations personnalisées et une boutique pour vous équiper.",
    ],
    icon: Newspaper,
    points: [
      { label: "Fil d'actualité près de chez vous" },
      { label: "Dossiers & thématiques" },
      { label: "Dispositifs & réglementations" },
      { label: "Astuces & aménagements responsables" },
      { label: "Recommandations personnalisées" },
      { label: "Boutique d'articles verts" },
    ],
    image: "/images/feature-informer.PNG",
    bareImage: true
  },
  {
    id: "carte",
    title: "Géolocalisation",
    subtitle: "Explorez les actions autour de vous",
    description: [
      "Sur la carte sont répertoriés : les initiatives de végétalisation, les espaces verts, les parcs et jardins, et les jardineries.",
      "Ainsi que tous les acteurs et dispositifs verts (fermes pédagogiques, jardins partagés, producteurs locaux biologiques, …).",
    ],
    icon: Map,
    points: [
      { label: "Carte interactive" },
      { label: "Initiatives, ateliers, parcs & jardins" },
      { label: "Acteurs & dispositifs verts" },
    ],
    image: "/images/feature-carte.PNG",
    bareImage: true
  }
];

// ─── Animation variants ─────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE }
  }
};

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: APPLE_EASE }
  }
};

// Word-by-word reveal — Apple's signature blur-in
const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
  }
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE }
  }
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE }
  }
};

const pointsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

const pointVariants: Variants = {
  hidden: { opacity: 0, x: -10, y: 4 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: APPLE_EASE }
  }
};

// ─── Sub-components ─────────────────────────────────────────────────────────

const AnimatedHeadline = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ');
  return (
    <motion.h3
      variants={headlineContainerVariants}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 mr-[0.25em]" style={{ marginBottom: '-0.25em' }}>
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h3>
  );
};

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-20% 0px -20% 0px' });

  // Scroll-driven parallax for the phone visual
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const rawPhoneY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rawPhoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);

  // Spring smoothing — buttery scroll
  const phoneY = useSpring(rawPhoneY, { stiffness: 90, damping: 28, mass: 0.6 });
  const phoneScale = useSpring(rawPhoneScale, { stiffness: 90, damping: 28, mass: 0.6 });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={sectionRef}
      className={`relative grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:grid-flow-dense'} py-2 md:py-4`}
    >
      {/* Content */}
      <motion.div
        ref={contentRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={`space-y-6 ${isEven ? '' : 'lg:col-start-2'}`}
      >
        {/* Icon */}
        <motion.div
          variants={iconVariants}
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-900 text-white"
        >
          <feature.icon className="w-5 h-5" strokeWidth={2} />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          variants={eyebrowVariants}
          className="text-sm font-semibold text-emerald-600 uppercase tracking-wider"
        >
          {feature.title}
        </motion.p>

        {/* Subtitle (H3) — word-by-word reveal */}
        <AnimatedHeadline
          text={feature.subtitle}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 leading-[1.15] tracking-tight"
        />

        {/* Paragraphs */}
        <motion.div variants={paragraphVariants} className="space-y-4 pt-2">
          {feature.description.map((p, idx) => (
            <p key={idx} className="text-base md:text-lg text-neutral-600 leading-relaxed">
              {p}
            </p>
          ))}
        </motion.div>

        {/* Points */}
        <motion.ul
          variants={pointsContainerVariants}
          className="grid sm:grid-cols-2 gap-3 pt-4"
        >
          {feature.points.map((point, i) => (
            <motion.li
              key={i}
              variants={pointVariants}
              className="flex items-start gap-2.5 text-neutral-700"
            >
              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="leading-snug">
                {point.label}
                {'ai' in point && point.ai && (
                  <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 align-middle">
                    <Sparkles className="w-2.5 h-2.5" strokeWidth={2.5} />
                    IA
                  </span>
                )}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Visual — entry animation + scroll parallax */}
      <div className={`relative flex justify-center items-center ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.2, ease: APPLE_EASE_OUT, delay: 0.1 }}
          className="will-change-transform"
        >
          <motion.div style={{ y: phoneY, scale: phoneScale }}>
            {feature.bareImage ? (
              <img
                src={feature.image}
                alt={`Interface ${feature.title}`}
                className="w-[300px] sm:w-[340px] lg:w-[400px] h-auto mix-blend-multiply"
              />
            ) : (
              <PhoneMockup
                src={feature.image}
                alt={`Interface ${feature.title}`}
                className="w-[260px] sm:w-[280px] lg:w-[300px]"
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Section header ─────────────────────────────────────────────────────────

const SectionHeader = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="text-center mb-6 md:mb-10 max-w-3xl mx-auto"
    >
      <motion.p
        variants={eyebrowVariants}
        className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4"
      >
        L'Application
      </motion.p>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-neutral-900 mb-6 leading-[1.1] tracking-tight">
        <motion.span
          variants={headlineContainerVariants}
          className="block"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {'Des fonctionnalités pour'.split(' ').map((word, i) => (
            <span key={`a-${i}`} className="inline-block overflow-hidden pb-1 mr-[0.25em]" style={{ marginBottom: '-0.25em' }}>
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
          {'agir ensemble'.split(' ').map((word, i) => (
            <span key={`b-${i}`} className="inline-block overflow-hidden pb-1 mr-[0.25em]" style={{ marginBottom: '-0.25em' }}>
              <motion.span variants={wordVariants} className="inline-block text-emerald-600">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </h2>

      <motion.p
        variants={paragraphVariants}
        className="text-base md:text-xl text-neutral-600 leading-relaxed"
      >
        Découvrez tous les outils à votre disposition pour participer activement à la transition écologique de votre ville et au quotidien.
      </motion.p>
    </motion.div>
  );
};

// ─── Main export ────────────────────────────────────────────────────────────

export const Features = () => {
  return (
    <section id="features" className="pt-20 md:pt-32 pb-10 md:pb-16 px-4 md:px-6 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader />

        {/* Features list */}
        <div className="space-y-0">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
