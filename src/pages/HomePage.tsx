import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Newspaper, ShoppingBag, Star, Smartphone, ArrowRight, Calendar, MapPin, ExternalLink, Sprout, Map, Flower2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  summary: string | null;
  category: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
}

interface Product {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number | null;
  imageUrl: string | null;
  affiliateLink: string | null;
}

interface Recommendation {
  id: string;
  title: string;
  summary: string | null;
  category: string | null;
  coverImageUrl: string | null;
  address: string | null;
}

export function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/articles').then(r => r.ok ? r.json() : []),
      fetch('/api/products').then(r => r.ok ? r.json() : []),
      fetch('/api/recommendations').then(r => r.ok ? r.json() : []),
    ]).then(([arts, prods, recs]) => {
      setArticles(arts.slice(0, 6));
      setProducts(prods.slice(0, 4));
      setRecommendations(recs.slice(0, 6));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return '';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-neutral-50 to-white pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-sm font-medium mb-8"
            >
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Bienvenue sur Ma Ville Verte</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                <img
                  src="/images/hero-app.PNG"
                  alt="Aperçu de l'application Ma Ville Verte"
                  className="w-[240px] sm:w-[280px] lg:w-[320px] h-auto mix-blend-multiply"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Preview */}
      <section id="articles-preview" className="py-20 md:py-32 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
                <Newspaper className="w-3.5 h-3.5" />
                Actualités
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 leading-[1.1] tracking-tight">
                Derniers <span className="text-emerald-600">articles</span>
              </h2>
            </div>
            <Link
              to="/articles"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors text-sm"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200/60">
              <Newspaper className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500">Aucun article pour le moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:border-neutral-300 hover:shadow-sm transition-all"
                >
                  <div className="relative h-44 overflow-hidden bg-neutral-100">
                    {article.coverImageUrl ? (
                      <img src={article.coverImageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                        <Newspaper className="w-10 h-10 text-neutral-300" />
                      </div>
                    )}
                    {article.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white rounded-full text-xs font-semibold text-neutral-700 border border-neutral-200/60">
                        {article.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-neutral-400 text-xs mb-2">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedAt)}
                    </div>
                    <h3 className="font-display font-semibold text-neutral-900 line-clamp-2 tracking-tight group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <Link
            to="/articles"
            className="md:hidden flex items-center justify-center gap-2 mt-8 px-6 py-3 bg-neutral-900 text-white font-medium rounded-full"
          >
            Voir tous les articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Shop Preview */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
                <ShoppingBag className="w-3.5 h-3.5" />
                Boutique
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 leading-[1.1] tracking-tight">
                Nos <span className="text-emerald-600">sélections</span>
              </h2>
            </div>
            <Link
              to="/boutique"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors text-sm"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200/60">
              <ShoppingBag className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500">Boutique bientôt disponible</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:border-neutral-300 hover:shadow-sm transition-all"
                >
                  <div className="relative h-40 overflow-hidden bg-neutral-100">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-neutral-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-neutral-900 text-sm line-clamp-2 mb-2 tracking-tight group-hover:text-emerald-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      {product.price !== null && (
                        <span className="font-semibold text-neutral-900">{formatPrice(product.price)}</span>
                      )}
                      {product.affiliateLink && (
                        <a
                          href={product.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          Voir <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <Link
            to="/boutique"
            className="md:hidden flex items-center justify-center gap-2 mt-8 px-6 py-3 bg-neutral-900 text-white font-medium rounded-full"
          >
            Voir la boutique
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Recommendations Preview */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
                <Star className="w-3.5 h-3.5" />
                Recommandations
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 leading-[1.1] tracking-tight">
                Nos <span className="text-emerald-600">coups de cœur</span>
              </h2>
            </div>
            <Link
              to="/recommandations"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors text-sm"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200/60">
              <Star className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500">Recommandations à venir</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:border-neutral-300 hover:shadow-sm transition-all"
                >
                  <div className="relative h-40 overflow-hidden bg-neutral-100">
                    {rec.coverImageUrl ? (
                      <img src={rec.coverImageUrl} alt={rec.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                        <Star className="w-10 h-10 text-neutral-300" />
                      </div>
                    )}
                    {rec.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white rounded-full text-xs font-semibold text-neutral-700 border border-neutral-200/60">
                        {rec.category}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-neutral-900 line-clamp-2 mb-2 tracking-tight group-hover:text-emerald-600 transition-colors">
                      {rec.title}
                    </h3>
                    {rec.address && (
                      <div className="flex items-center gap-2 text-neutral-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{rec.address}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <Link
            to="/recommandations"
            className="md:hidden flex items-center justify-center gap-2 mt-8 px-6 py-3 bg-neutral-900 text-white font-medium rounded-full"
          >
            Voir les recommandations
            <ArrowRight className="w-4 h-4" />
          </Link>
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
