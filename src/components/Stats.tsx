import { motion } from 'framer-motion';
import { TreePine, Wind, ThermometerSun, Users } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: "90%",
    label: "Des français dépendent des villes (Insee)",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: TreePine,
    value: "85%",
    label: "Des français considèrent importante la proximité avec un espace vert",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Wind,
    value: "100g",
    label: "De particules fines piégées par un arbre en ville par an",
    color: "bg-gray-50 text-gray-600"
  },
  {
    icon: ThermometerSun,
    value: "-3 à 5°C",
    label: "Réduction de la température urbaine grâce aux arbres d'ombrage",
    color: "bg-orange-50 text-orange-600"
  }
];

export const Stats = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-wider text-sm uppercase">Un constat</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mt-2">Pourquoi agir maintenant ?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center group"
            >
              <div className={`p-4 rounded-2xl mb-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-secondary mb-3">{stat.value}</h3>
              <p className="text-secondary/70 font-medium leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-secondary/5 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-secondary mb-6 text-center">La mobilisation citoyenne au cœur de la transition</h3>
          <div className="grid md:grid-cols-2 gap-8 text-secondary/80 leading-relaxed">
            <p>
              D'un côté, les Français ont soif de démocratie et souhaitent être davantage associés aux décisions qui les concernent au quotidien. De l'autre, la lutte contre le réchauffement climatique implique de tels changements qu'il est impossible de réaliser cette transition sans l'adhésion du plus grand nombre.
            </p>
            <p>
              Qu'il s'agisse d'aménagement urbain, de mobilité ou d'énergie, la coopération des habitants permet d'inventer des réponses inédites. La participation citoyenne est un moyen pragmatique et enthousiaste de mieux fabriquer la cité de demain.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
