import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, ArrowRight } from 'lucide-react';

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

export function RecommendationsSection() {
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
      <section id="recommandations" className="py-24 px-6 bg-gradient-to-b from-white to-purple-50/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="recommandations" className="py-24 px-6 bg-gradient-to-b from-white to-purple-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-30" />
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-100 text-purple-700 font-bold text-sm tracking-wider uppercase mb-6"
          >
            <Star className="w-4 h-4" />
            Recommandations
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Nos <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">coups de cœur</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les meilleures adresses et bons plans recommandés par notre communauté
          </p>
        </motion.div>

        {/* Category filters */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {recommendations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucune recommandation pour le moment</p>
            <p className="text-gray-400 mt-2">Nos coups de cœur arrivent bientôt</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecs.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => openRecDetail(rec.id)}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {rec.coverImageUrl ? (
                    <img
                      src={rec.coverImageUrl}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Star className="w-16 h-16 text-purple-200" />
                    </div>
                  )}
                  {/* Category badge */}
                  {rec.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-700 shadow-sm">
                        {rec.category}
                      </span>
                    </div>
                  )}
                  {/* Star badge */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {rec.title}
                  </h3>

                  {/* Address */}
                  {rec.address && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{rec.address}</span>
                    </div>
                  )}

                  {/* Summary */}
                  {rec.summary && (
                    <p className="text-gray-600 line-clamp-2 mb-4 whitespace-pre-wrap">
                      {rec.summary}
                    </p>
                  )}

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
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
      {selectedRec && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedRec(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedRec.coverImageUrl && (
              <img
                src={selectedRec.coverImageUrl}
                alt={selectedRec.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                {selectedRec.category && (
                  <span className="px-4 py-1.5 bg-purple-100 rounded-full text-sm font-semibold text-purple-700">
                    {selectedRec.category}
                  </span>
                )}
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedRec.publishedAt)}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedRec.title}
              </h2>
              
              {selectedRec.summary && (
                <p className="text-lg text-gray-600 mb-6 whitespace-pre-wrap">
                  {selectedRec.summary}
                </p>
              )}

              {selectedRec.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedRec.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 mb-6 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>{selectedRec.address}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-purple-600" />
                </a>
              )}

              {selectedRec.contentMarkdown && (
                <div 
                  className="prose prose-purple max-w-none mb-6 prose-img:rounded-xl prose-headings:text-gray-900 prose-p:whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: selectedRec.contentMarkdown }}
                />
              )}
              
              <button
                onClick={() => setSelectedRec(null)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
