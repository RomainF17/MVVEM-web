import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PhoneMockup } from '../components/PhoneMockup';
import { Newspaper, ShoppingBag, Star, Smartphone, ArrowRight, Sprout, Map, Flower2 } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-neutral-50 to-white pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-neutral-900 leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto"
            >
              Votre guide pour une{' '}
              <span className="text-emerald-600">ville plus verte</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-xl text-neutral-600 mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed"
            >
              Découvrez les actualités, les bons plans et les recommandations pour vivre de manière plus écologique
            </motion.p>

            {/* Feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto"
            >
              {[
                { icon: Newspaper, label: 'Articles', desc: 'Actualités vertes', to: '/articles' },
                { icon: ShoppingBag, label: 'Boutique', desc: 'Produits éco', to: '/boutique' },
                { icon: Star, label: 'Recommandations', desc: 'Nos coups de cœur', to: '/recommandations' },
                { icon: Smartphone, label: 'Application', desc: 'Télécharger', to: '/application' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.to}
                    className="block group bg-white rounded-2xl p-5 md:p-6 border border-neutral-200/80 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 text-left"
                  >
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-neutral-900 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                      <item.icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="font-display font-semibold text-neutral-900 mb-1 tracking-tight">
                      {item.label}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {item.desc}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section id="app-preview" className="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-5">
                <Smartphone className="w-3.5 h-3.5" />
                L'application
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-5">
                L'app Ma Ville Verte en <span className="text-emerald-600">un clin d'œil</span>
              </h2>
              <p className="text-base md:text-lg text-neutral-600 mb-8 md:mb-10 leading-relaxed">
                Un aperçu rapide de l'accueil de l'app et de ses 4 fonctionnalités clés pour vous informer, échanger et agir localement.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
                {[
                  {
                    icon: Newspaper,
                    title: 'Informer',
                    desc: "Actualités vertes, dossiers locaux et conseils pratiques."
                  },
                  {
                    icon: Sprout,
                    title: 'Échanger & proposer',
                    desc: 'Partagez vos initiatives et rejoignez la communauté.'
                  },
                  {
                    icon: Map,
                    title: 'Géolocalisation',
                    desc: "Carte interactive des actions, parcs et acteurs verts."
                  },
                  {
                    icon: Flower2,
                    title: 'Mes Plantes',
                    desc: "Suivi personnalisé, rappels d'arrosage et fiches détaillées."
                  }
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-white rounded-2xl border border-neutral-200/80 px-4 py-4 flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-neutral-900 mb-0.5 tracking-tight">{feature.title}</h3>
                      <p className="text-sm text-neutral-600 leading-snug">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/application"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors text-sm md:text-base"
              >
                Découvrir l'application
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <PhoneMockup
                  src="/images/hero-app.PNG"
                  alt="Aperçu de l'application Ma Ville Verte"
                  className="w-[240px] sm:w-[280px] lg:w-[320px]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App CTA */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-neutral-950">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-neutral-300 text-sm font-medium mb-8">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              Application mobile
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white leading-[1.1] tracking-tight mb-6">
              Téléchargez <span className="text-emerald-400">l'application</span>
            </h2>
            <p className="text-base md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
              Accédez à toutes les fonctionnalités directement depuis votre smartphone
            </p>
            <Link
              to="/application"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 font-medium rounded-full hover:bg-neutral-100 transition-colors text-base"
            >
              Découvrir l'application
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
