import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, ArrowRight, ArrowLeft, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
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

export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(articles.map(a => a.category).filter(Boolean))];
  
  const filteredArticles = selectedCategory 
    ? articles.filter(a => a.category === selectedCategory)
    : articles;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const openArticleDetail = async (articleId: string) => {
    try {
      const response = await fetch(`/api/articles/${articleId}`);
      if (response.ok) {
        const fullArticle = await response.json();
        setSelectedArticle(fullArticle);
      }
    } catch (error) {
      console.error('Error fetching article detail:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-16">
      {/* Background decoration */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm tracking-wider uppercase mb-6"
          >
            <Newspaper className="w-4 h-4" />
            Actualités
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Tous nos <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">articles</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez toutes les actualités et initiatives vertes de votre ville
          </p>
        </motion.div>

        {/* Category filters */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
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
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Articles grid */}
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun article pour le moment</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => openArticleDetail(article.id)}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  {article.coverImageUrl ? (
                    <img
                      src={article.coverImageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                      <Newspaper className="w-16 h-16 text-emerald-300" />
                    </div>
                  )}
                  {article.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-700 shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.publishedAt)}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {article.title}
                  </h3>

                  {article.summary && (
                    <p className="text-gray-600 line-clamp-3 mb-4 whitespace-pre-wrap">
                      {article.summary}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                    Lire l'article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            {selectedArticle.coverImageUrl && (
              <img
                src={selectedArticle.coverImageUrl}
                alt={selectedArticle.title}
                className="w-full h-auto max-h-96 object-cover"
              />
            )}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                {selectedArticle.category && (
                  <span className="px-4 py-1.5 bg-emerald-100 rounded-full text-sm font-semibold text-emerald-700">
                    {selectedArticle.category}
                  </span>
                )}
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedArticle.publishedAt)}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedArticle.title}
              </h2>
              
              {selectedArticle.summary && (
                <p className="text-lg text-gray-600 mb-6 whitespace-pre-wrap">
                  {selectedArticle.summary}
                </p>
              )}

              {selectedArticle.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedArticle.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 mb-6 p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>{selectedArticle.address}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-emerald-600" />
                </a>
              )}

              {selectedArticle.contentMarkdown && (
                <div 
                  className="prose prose-emerald max-w-none mb-6 prose-img:rounded-xl prose-headings:text-gray-900 prose-p:whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.contentMarkdown }}
                />
              )}
              
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
