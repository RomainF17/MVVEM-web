import { motion } from 'framer-motion';
import { Map, Newspaper, Sprout, HeartHandshake } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

const features = [
  {
    id: "informer",
    title: "Informer",
    description: [
      "La page Infos permet d’informer l’utilisateur de l’actualité verte de sa commune et de le sensibiliser à la nature et au respect des pratiques de développement durable.",
      "Un fil d’actualité affiche l’initiative et l’actualité se déroulant près de chez vous.",
      "Sont classés dans nos grandes thématiques les dispositifs et réglementations mis en place par la commune, les astuces et aménagements permettant de végétaliser son environnement de manière responsable, ou encore de nombreux dossiers sur votre ville, ses ressources et infrastructures vertes.",
    ],
    icon: Newspaper,
    color: "bg-emerald-100 text-emerald-700",
    points: [
      "Fil d’actualité près de chez vous",
      "Dossiers & thématiques",
      "Dispositifs & réglementations",
      "Astuces & aménagements responsables",
    ],
    image: "/images/feature-informer.PNG"
  },
  {
    id: "echanger",
    title: "Échanger & proposer",
    description: [
      "Chaque membre de la communauté pourra créer et proposer une initiative verte qui pourra se dérouler dans sa ville à un temps donné.",
      "Celle-ci pourra être vue par tous les utilisateurs de l’application qui pourront faire le choix d’y participer, de la suivre et/ou de la partager.",
    ],
    icon: Sprout,
    color: "bg-lime-100 text-lime-700",
    points: [
      "Créer une initiative verte",
      "Participer, suivre, partager",
      "Rencontrer & fédérer les voisins",
    ],
    image: "/images/feature-echanger.PNG"
  },
  {
    id: "carte",
    title: "Géolocalisation des actions",
    description: [
      "Sur la carte sont répertoriés : les initiatives de végétalisation, les ateliers de sensibilisation à la nature, les parcs et jardins, les jardineries et fleuristes.",
      "Ainsi que tous les acteurs et dispositifs verts (fermes pédagogiques, jardins partagés, producteurs locaux biologiques, …).",
    ],
    icon: Map,
    color: "bg-blue-100 text-blue-700",
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
    description: [
      "L’onglet Financement participatif permet à des membres de la communauté de proposer et/ou soutenir des projets verts innovants nécessitant un apport financier et matériel plus important pour sa mise en place.",
    ],
    icon: HeartHandshake,
    color: "bg-amber-100 text-amber-700",
    points: [
      "Financement participatif communautaire",
      "Soutenir des projets verts innovants",
      "Suivi simple & transparent",
    ],
    image: "/images/feature-financer.PNG"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-6 bg-white overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold tracking-wider text-sm uppercase">L'Application</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mt-2">Des fonctionnalités pour agir</h2>
        </motion.div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-display font-bold text-secondary">{feature.title}</h3>
                <div className="space-y-4 text-lg text-secondary/70 leading-relaxed">
                  {feature.description.map((p: string, idx: number) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
                <ul className="space-y-3">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-secondary font-medium">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual/Phone Mockup */}
              <div className="flex-1 w-full flex justify-center">
                <PhoneMockup
                  src={feature.image}
                  alt={`Interface ${feature.title}`}
                  className="w-[300px] lg:w-[320px]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
