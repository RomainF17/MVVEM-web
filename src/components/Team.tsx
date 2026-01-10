import { motion } from 'framer-motion';

const team = [
  { name: "Audrey", role: "Co-fondatrice", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Jacky", role: "Co-fondateur", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Maxime", role: "Co-fondateur", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Romain", role: "Co-fondateur", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" },
];

export const Team = () => {
  return (
    <section id="team" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-wider text-sm uppercase">Qui sommes-nous ?</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mt-2 mb-6">Une équipe passionnée</h2>
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            Quatre passionnés de nouvelles technologies et anciens apprenants de l'Apple Foundation Program, souhaitant faire avancer la société à travers des idées qui font sens.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-4 inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto relative z-10">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 z-0"></div>
              </div>
              <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
              <p className="text-primary font-medium text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-[2.5rem] p-8 md:p-16 text-center shadow-xl border border-secondary/5 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">Prêt à végétaliser votre ville ?</h3>
            <p className="text-lg text-secondary/70 mb-8 max-w-2xl mx-auto">
              Rejoignez la communauté et participez dès aujourd'hui à la construction d'un avenir plus vert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-secondary px-8 py-3 rounded-full font-bold text-lg hover:bg-primary/90 hover:shadow-lg transition-all">
                Télécharger l'application
              </button>
              <button className="bg-secondary text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-secondary/90 transition-all">
                Nous contacter
              </button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50 blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
};
