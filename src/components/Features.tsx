import { motion } from 'framer-motion';
import { Map, Newspaper, Sprout, HeartHandshake } from 'lucide-react';

const features = [
  {
    id: "informer",
    title: "Informer & Sensibiliser",
    description: "Un fil d'actualité local pour rester connecté aux initiatives vertes de sa commune. Retrouvez les dispositifs, réglementations, astuces et aménagements pour végétaliser de manière responsable.",
    icon: Newspaper,
    color: "bg-emerald-100 text-emerald-700",
    points: ["Fil d'actualité local", "Dossiers thématiques", "Astuces éco-responsables"],
    image: "/images/feature-informer.PNG"
  },
  {
    id: "echanger",
    title: "Échanger & Proposer",
    description: "Chaque membre peut proposer une initiative verte éphémère ou durable. Créez des murs floraux, lancez des défis et partagez vos réussites avec la communauté.",
    icon: Sprout,
    color: "bg-lime-100 text-lime-700",
    points: ["Création d'initiatives", "Participation aux événements", "Partage communautaire"],
    image: "/images/feature-echanger.PNG"
  },
  {
    id: "carte",
    title: "Géolocalisation des actions",
    description: "Une carte interactive répertoriant toutes les initiatives de végétalisation, ateliers, parcs, jardins partagés et acteurs locaux du développement durable.",
    icon: Map,
    color: "bg-blue-100 text-blue-700",
    points: ["Carte interactive", "Filtres par catégorie", "Découverte locale"],
    image: "/images/feature-carte.png"
  },
  {
    id: "soutenir",
    title: "Soutenir & Financer",
    description: "Un espace de financement participatif pour donner vie aux projets verts innovants nécessitant un apport matériel ou financier plus conséquent.",
    icon: HeartHandshake,
    color: "bg-amber-100 text-amber-700",
    points: ["Crowdfunding local", "Suivi de projet", "Transparence"],
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
              </div>

              {/* Visual/Phone Mockup */}
              <div className="flex-1 w-full flex justify-center">
                <div className="relative w-[300px] h-[600px] bg-secondary rounded-[3rem] border-8 border-secondary shadow-2xl overflow-hidden ring-4 ring-secondary/20">
                  {/* Status Bar */}
                  <div className="absolute top-0 w-full h-8 bg-secondary z-20 flex justify-between px-6 items-center">
                    <div className="w-12 h-4 bg-black/20 rounded-full mx-auto" />
                  </div>
                  
                  {/* Screen Content - Image */}
                  <div className="w-full h-full bg-background pt-8 pb-8 flex flex-col relative overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={`Interface ${feature.title}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback si l'image n'existe pas encore
                        e.currentTarget.src = "https://images.unsplash.com/photo-1512428559087-560fa5ce7d5b?auto=format&fit=crop&q=80&w=600&h=1200";
                        e.currentTarget.className = "w-full h-full object-cover opacity-50 grayscale";
                      }}
                    />
                    
                    {/* Overlay si pas d'image (texte d'aide) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <span className="sr-only">Image de l'application</span>
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
