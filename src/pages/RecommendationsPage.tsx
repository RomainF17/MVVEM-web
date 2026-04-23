import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Calendar, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Recommendation {
  id: string;
  title: string;
  summary: string | null;
  category: string | null;
  tags: string | null;
  coverImageUrl: string | null;
  contentMarkdown: string | null;
  address: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

export function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/api/recommendations');
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(recommendations.map(r => r.category).filter(Boolean))];

  const filteredRecs = selectedCategory
    ? recommendations.filter(r => r.category === selectedCategory)
    : recommendations;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const openRecDetail = async (recId: string) => {
    try {
      const response = await fetch(`/api/recommendations/${recId}`);
      if (response.ok) {
        const fullRec = await response.json();
        setSelectedRec(fullRec);
      }
    } catch (error) {
      console.error('Error fetching recommendation detail:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-neutral-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-32 pb-20 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-5">
            <Star className="w-3.5 h-3.5" />
            Recommandations
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-neutral-900 leading-[1.05] tracking-tight mb-5">
            Nos <span className="text-emerald-600">coups de cœur</span>
          </h1>

          <p className="text-base md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez les meilleures adresses et bons plans recommandés par notre communauté
          </p>
        </motion.div>

        {/* Category filters */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-2 mb-12 md:mb-14"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                selectedCategory === null
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-neutral-200'
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Recommendations grid */}
        {filteredRecs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200/60"
          >
            <Star className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">Aucune recommandation pour le moment</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredRecs.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openRecDetail(rec.id)}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden bg-neutral-100">
                  {rec.coverImageUrl ? (
                    <img
                      src={rec.coverImageUrl}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                      <Star className="w-14 h-14 text-neutral-300" />
                    </div>
                  )}
                  {rec.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-neutral-700 border border-neutral-200/60">
                        {rec.category}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <div className="w-9 h-9 bg-neutral-900 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2 line-clamp-2 tracking-tight group-hover:text-emerald-600 transition-colors">
                    {rec.title}
                  </h3>

                  {rec.address && (
                    <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{rec.address}</span>
                    </div>
                  )}

                  {rec.summary && (
                    <p className="text-neutral-600 line-clamp-2 mb-5 whitespace-pre-wrap text-sm leading-relaxed">
                      {rec.summary}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm group-hover:gap-3 transition-all">
                    Découvrir
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Recommendation Modal */}
      <AnimatePresence>
        {selectedRec && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/70"
            onClick={() => setSelectedRec(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedRec(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                <X className="w-4 h-4 text-neutral-600" />
              </button>
              {selectedRec.coverImageUrl && (
                <img
                  src={selectedRec.coverImageUrl}
                  alt={selectedRec.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  {selectedRec.category && (
                    <span className="px-3 py-1 bg-emerald-50 rounded-full text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                      {selectedRec.category}
                    </span>
                  )}
                  <span className="text-neutral-400 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedRec.publishedAt)}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-display font-semibold text-neutral-900 mb-5 tracking-tight leading-tight">
                  {selectedRec.title}
                </h2>

                {selectedRec.summary && (
                  <p className="text-base md:text-lg text-neutral-600 mb-6 whitespace-pre-wrap leading-relaxed">
                    {selectedRec.summary}
                  </p>
                )}

                {selectedRec.address && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedRec.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-neutral-700 mb-6 p-4 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors border border-neutral-200/60"
                  >
                    <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="flex-1">{selectedRec.address}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </a>
                )}

                {selectedRec.contentMarkdown && (
                  <div
                    className="prose prose-neutral max-w-none mb-8 prose-img:rounded-2xl prose-headings:text-neutral-900 prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-p:whitespace-pre-line prose-a:text-emerald-600"
                    dangerouslySetInnerHTML={{ __html: selectedRec.contentMarkdown }}
                  />
                )}

                <button
                  onClick={() => setSelectedRec(null)}
                  className="w-full py-3.5 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
