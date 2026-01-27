import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PhoneMockup } from '../components/PhoneMockup';
import { Leaf, Newspaper, ShoppingBag, Star, Smartphone, ChevronDown, ArrowRight, Calendar, MapPin, ExternalLink, Sprout, Map, Flower2 } from 'lucide-react';

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-40"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-40"
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-lime-200 rounded-full blur-3xl opacity-30"
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-lg shadow-emerald-100/50 mb-8"
            >
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-emerald-700">Bienvenue sur Ma Ville Verte</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight"
            >
              Votre guide pour une{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
                  ville plus verte
                </span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <motion.path
                    d="M2 10C50 2 100 2 150 6C200 10 250 10 298 2"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Découvrez les actualités, les bons plans et les recommandations pour vivre de manière plus écologique
            </motion.p>

            {/* Feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {[
                { icon: Newspaper, label: 'Articles', desc: 'Actualités vertes', gradient: 'from-emerald-500 to-teal-500', to: '/articles' },
                { icon: ShoppingBag, label: 'Boutique', desc: 'Produits éco', gradient: 'from-amber-500 to-orange-500', to: '/boutique' },
                { icon: Star, label: 'Recommandations', desc: 'Nos coups de cœur', gradient: 'from-purple-500 to-pink-500', to: '/recommandations' },
                { icon: Smartphone, label: 'Application', desc: 'Télécharger', gradient: 'from-blue-500 to-cyan-500', to: '/application' },
              ].map((item, index) => (
                <motion.div key={item.label}>
                  <Link
                    to={item.to}
                    className="block group"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 text-left overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                        {item.label}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.desc}
                      </p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.button
              onClick={() => scrollToSection('app-preview')}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-emerald-600 transition-colors"
            >
              <span className="text-sm font-medium">Découvrir</span>
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* App Preview */}
      <section id="app-preview" className="py-20 px-6 bg-gradient-to-b from-white via-emerald-50/40 to-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-4">
                <Smartphone className="w-4 h-4" />
                L'application
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                L'app Ma Ville Verte en <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">un clin d'œil</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Un aperçu rapide de l'accueil de l'app et de ses 4 fonctionnalités clés pour vous informer, échanger et agir localement.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: Newspaper,
                    title: 'Informer',
                    desc: "Actualités vertes, dossiers locaux et conseils pratiques.",
                    gradient: 'from-emerald-500 to-teal-500'
                  },
                  {
                    icon: Sprout,
                    title: 'Échanger & proposer',
                    desc: 'Partagez vos initiatives et rejoignez la communauté.',
                    gradient: 'from-lime-500 to-green-500'
                  },
                  {
                    icon: Map,
                    title: 'Géolocalisation',
                    desc: "Carte interactive des actions, parcs et acteurs verts.",
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    icon: Flower2,
                    title: 'Mes Plantes',
                    desc: "Suivi personnalisé, rappels d'arrosage et fiches détaillées.",
                    gradient: 'from-amber-500 to-orange-500'
                  }
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm px-4 py-4 flex gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-snug">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/application"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full hover:shadow-lg transition-all"
              >
                Découvrir l'application
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-emerald-300/30 to-teal-200/20 blur-[70px] animate-pulse-slow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] h-[300px] rounded-full border border-emerald-400/15 animate-spin-slow" />
                <div
                  className="absolute w-[250px] h-[250px] rounded-full border border-emerald-400/10 animate-spin-slow"
                  style={{ animationDirection: 'reverse' }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30, rotateY: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                className="relative z-10"
              >
                <PhoneMockup
                  src="/images/hero-app.PNG"
                  alt="Aperçu de l'application Ma Ville Verte"
                  className="w-[200px] sm:w-[220px] lg:w-[240px] drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Preview */}
      <section id="articles-preview" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-3">
                <Newspaper className="w-4 h-4" />
                Actualités
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                Derniers <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">articles</span>
              </h2>
            </div>
            <Link
              to="/articles"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full hover:shadow-lg transition-all"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucun article pour le moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    {article.coverImageUrl ? (
                      <img src={article.coverImageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                        <Newspaper className="w-10 h-10 text-emerald-300" />
                      </div>
                    )}
                    {article.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-emerald-700">
                        {article.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedAt)}
                    </div>
                    <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <Link
            to="/articles"
            className="md:hidden flex items-center justify-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full"
          >
            Voir tous les articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Shop Preview */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-sm mb-3">
                <ShoppingBag className="w-4 h-4" />
                Boutique
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                Nos <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">sélections</span>
              </h2>
            </div>
            <Link
              to="/boutique"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition-all"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Boutique bientôt disponible</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all"
                >
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-amber-200" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-amber-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      {product.price !== null && (
                        <span className="font-bold text-amber-600">{formatPrice(product.price)}</span>
                      )}
                      {product.affiliateLink && (
                        <a
                          href={product.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
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
            className="md:hidden flex items-center justify-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full"
          >
            Voir la boutique
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Recommendations Preview */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mb-3">
                <Star className="w-4 h-4" />
                Recommandations
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                Nos <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">coups de cœur</span>
              </h2>
            </div>
            <Link
              to="/recommandations"
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full hover:shadow-lg transition-all"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Recommandations à venir</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    {rec.coverImageUrl ? (
                      <img src={rec.coverImageUrl} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <Star className="w-10 h-10 text-purple-200" />
                      </div>
                    )}
                    {rec.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-purple-700">
                        {rec.category}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                      {rec.title}
                    </h3>
                    {rec.address && (
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
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
            className="md:hidden flex items-center justify-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full"
          >
            Voir les recommandations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* App CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-bold text-sm mb-6">
              <Smartphone className="w-4 h-4" />
              Application mobile
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Téléchargez l'application
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Accédez à toutes les fonctionnalités directement depuis votre smartphone
            </p>
            <Link
              to="/application"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-600 font-bold rounded-full hover:shadow-xl transition-all text-lg"
            >
              Découvrir l'application
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
