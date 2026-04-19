import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Newspaper, Sprout, Flower2, Check, Sparkles } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { useRef } from 'react';

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
    image: "/images/feature-echanger.PNG"
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
    image: "/images/mes-plantes.PNG"
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
    image: "/images/feature-informer.PNG"
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
    image: "/images/feature-carte.png"
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.2 1", "0.8 0"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:grid-flow-dense'} py-12 md:py-20`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`space-y-6 ${isEven ? '' : 'lg:col-start-2'}`}
      >
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-900 text-white">
          <feature.icon className="w-5 h-5" strokeWidth={2} />
        </div>

        {/* Eyebrow */}
        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
          {feature.title}
        </p>

        {/* Subtitle (H3) */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 leading-[1.15] tracking-tight">
          {feature.subtitle}
        </h3>

        {/* Paragraphs */}
        <div className="space-y-4 pt-2">
          {feature.description.map((p, idx) => (
            <p key={idx} className="text-lg text-neutral-600 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Points */}
        <ul className="grid sm:grid-cols-2 gap-3 pt-4">
          {feature.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-neutral-700"
            >
              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="leading-snug">
                {point.label}
                {point.ai && (
                  <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 align-middle">
                    <Sparkles className="w-2.5 h-2.5" strokeWidth={2.5} />
                    IA
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Phone mockup container */}
      <div className={`relative flex justify-center items-center ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
        <motion.div
          style={{ y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <PhoneMockup
            src={feature.image}
            alt={`Interface ${feature.title}`}
            className="w-[260px] sm:w-[280px] lg:w-[300px]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">
            L'Application
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-neutral-900 mb-6 leading-[1.1] tracking-tight">
            Des fonctionnalités pour <span className="text-emerald-600">agir ensemble</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            Découvrez tous les outils à votre disposition pour participer activement à la transition écologique de votre ville et au quotidien.
          </p>
        </motion.div>

        {/* Features list */}
        <div className="space-y-8 lg:space-y-16">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
