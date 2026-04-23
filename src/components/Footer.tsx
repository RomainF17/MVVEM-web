import { motion } from 'framer-motion';
import { Leaf, ArrowUpRight, Mail, MapPin } from 'lucide-react';

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
    <footer className="bg-neutral-950 text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main footer content */}
        <div className="py-16 md:py-20 grid lg:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <span className="font-display font-semibold text-xl block tracking-tight">Ma Ville Verte</span>
                  <span className="text-neutral-500 text-sm">et Moi</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-400 leading-relaxed max-w-md text-base">
                Ensemble, construisons des villes plus vertes, plus solidaires et plus humaines. Rejoignez le mouvement citoyen pour la transition écologique.
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <a
                  href="mailto:mavilleverte@proton.me"
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">mavilleverte@proton.me</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="flex items-center gap-3 text-neutral-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">France</span>
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
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: categoryIndex * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4 className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-neutral-500 mb-5">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-neutral-300 hover:text-white transition-colors text-sm inline-flex items-center gap-1.5 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-neutral-500 text-xs">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Ma Ville Verte et Moi.</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Tous droits réservés</span>
          </div>
          <span>Fait en France</span>
        </div>
      </div>
    </footer>
  );
};
