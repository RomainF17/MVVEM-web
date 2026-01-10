import { motion } from 'framer-motion';
import { Map, Newspaper, Sprout, HeartHandshake, ArrowRight } from 'lucide-react';

const features = [
  {
    id: "informer",
    title: "Informer & Sensibiliser",
    description: "Un fil d'actualité local pour rester connecté aux initiatives vertes de sa commune. Retrouvez les dispositifs, réglementations, astuces et aménagements pour végétaliser de manière responsable.",
    icon: Newspaper,
    color: "bg-emerald-100 text-emerald-700",
    points: ["Fil d'actualité local", "Dossiers thématiques", "Astuces éco-responsables"]
  },
  {
    id: "echanger",
    title: "Échanger & Proposer",
    description: "Chaque membre peut proposer une initiative verte éphémère ou durable. Créez des murs floraux, lancez des défis et partagez vos réussites avec la communauté.",
    icon: Sprout,
    color: "bg-lime-100 text-lime-700",
    points: ["Création d'initiatives", "Participation aux événements", "Partage communautaire"]
  },
  {
    id: "carte",
    title: "Géolocalisation des actions",
    description: "Une carte interactive répertoriant toutes les initiatives de végétalisation, ateliers, parcs, jardins partagés et acteurs locaux du développement durable.",
    icon: Map,
    color: "bg-blue-100 text-blue-700",
    points: ["Carte interactive", "Filtres par catégorie", "Découverte locale"]
  },
  {
    id: "soutenir",
    title: "Soutenir & Financer",
    description: "Un espace de financement participatif pour donner vie aux projets verts innovants nécessitant un apport matériel ou financier plus conséquent.",
    icon: HeartHandshake,
    color: "bg-amber-100 text-amber-700",
    points: ["Crowdfunding local", "Suivi de projet", "Transparence"]
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
                <p className="text-lg text-secondary/70 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-secondary font-medium">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
                <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all mt-4 group">
                  En savoir plus <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Visual/Phone Placeholder */}
              <div className="flex-1 w-full flex justify-center">
                <div className="relative w-[300px] h-[600px] bg-secondary rounded-[3rem] border-8 border-secondary shadow-2xl overflow-hidden">
                  {/* Status Bar */}
                  <div className="absolute top-0 w-full h-8 bg-secondary z-20 flex justify-between px-6 items-center">
                    <div className="w-12 h-4 bg-black/20 rounded-full mx-auto" />
                  </div>
                  
                  {/* Screen Content Simulation */}
                  <div className="w-full h-full bg-background pt-12 px-4 pb-8 flex flex-col relative overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-8 h-8 rounded-full bg-secondary/10" />
                      <div className="text-center">
                        <div className="text-xs text-secondary/50 uppercase font-bold">Ma Ville Verte</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary/10" />
                    </div>

                    {/* Dynamic Content based on feature */}
                    <div className="flex-1 space-y-4 overflow-hidden relative">
                       {/* Abstract representations of UI elements */}
                       <div className="w-full h-40 bg-white rounded-2xl shadow-sm p-4 mb-4">
                          <div className="w-1/2 h-4 bg-gray-100 rounded mb-2" />
                          <div className="w-full h-20 bg-emerald-50 rounded-lg mb-2" />
                       </div>
                       <div className="w-full h-32 bg-white rounded-2xl shadow-sm p-4 flex gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0" />
                          <div className="flex-1">
                            <div className="w-3/4 h-4 bg-gray-100 rounded mb-2" />
                            <div className="w-1/2 h-3 bg-gray-50 rounded" />
                          </div>
                       </div>
                       
                       {/* Floating Action Button */}
                       <div className="absolute bottom-4 right-4 w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center">
                         <div className="w-6 h-6 text-white text-xl">+</div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
