import { motion } from 'framer-motion';
import { Leaf, Heart, ArrowUpRight, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  produit: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Télécharger", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  entreprise: [
    { label: "Notre Mission", href: "#mission" },
    { label: "L'Équipe", href: "#team" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Mentions légales", href: "#" },
    { label: "Confidentialité", href: "#" },
    { label: "CGU", href: "#" },
  ]
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-secondary via-secondary to-emerald-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main footer content */}
        <div className="py-16 lg:py-20 grid lg:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="font-display font-bold text-2xl block">Ma Ville Verte</span>
                  <span className="text-white/60 text-sm">et Moi</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-white/60 leading-relaxed max-w-md text-lg">
                Ensemble, construisons des villes plus vertes, plus solidaires et plus humaines. 
                Rejoignez le mouvement citoyen pour la transition écologique.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <a href="mailto:mavilleverte@proton.me" className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors group">
                  <Mail className="w-5 h-5" />
                  <span>mavilleverte@proton.me</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5" />
                  <span>France</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h4 className="font-display font-bold text-lg mb-6 capitalize">{category}</h4>
                <ul className="space-y-4">
                  {links.map((link, linkIndex) => (
                    <motion.li 
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <a 
                        href={link.href}
                        className="text-white/60 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span>© {currentYear} Ma Ville Verte et Moi.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Tous droits réservés</span>
          </div>
          
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span>Fait avec</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.div>
            <span>en France</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
