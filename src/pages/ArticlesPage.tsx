import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
            <Newspaper className="w-3.5 h-3.5" />
            Actualités
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-neutral-900 leading-[1.05] tracking-tight mb-5">
            Tous nos <span className="text-emerald-600">articles</span>
          </h1>

          <p className="text-base md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez toutes les actualités et initiatives vertes de votre ville
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

        {/* Articles grid */}
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200/60"
          >
            <Newspaper className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">Aucun article pour le moment</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openArticleDetail(article.id)}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden bg-neutral-100">
                  {article.coverImageUrl ? (
                    <img
                      src={article.coverImageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                      <Newspaper className="w-14 h-14 text-neutral-300" />
                    </div>
                  )}
                  {article.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-neutral-700 border border-neutral-200/60">
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(article.publishedAt)}
                  </div>

                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3 line-clamp-2 tracking-tight group-hover:text-emerald-600 transition-colors">
                    {article.title}
                  </h3>

                  {article.summary && (
                    <p className="text-neutral-600 line-clamp-3 mb-5 whitespace-pre-wrap leading-relaxed text-sm">
                      {article.summary}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm group-hover:gap-3 transition-all">
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
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/70"
            onClick={() => setSelectedArticle(null)}
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
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                <X className="w-4 h-4 text-neutral-600" />
              </button>
              {selectedArticle.coverImageUrl && (
                <img
                  src={selectedArticle.coverImageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-auto max-h-96 object-cover"
                />
              )}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  {selectedArticle.category && (
                    <span className="px-3 py-1 bg-emerald-50 rounded-full text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                      {selectedArticle.category}
                    </span>
                  )}
                  <span className="text-neutral-400 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedArticle.publishedAt)}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-display font-semibold text-neutral-900 mb-5 tracking-tight leading-tight">
                  {selectedArticle.title}
                </h2>

                {selectedArticle.summary && (
                  <p className="text-base md:text-lg text-neutral-600 mb-6 whitespace-pre-wrap leading-relaxed">
                    {selectedArticle.summary}
                  </p>
                )}

                {selectedArticle.address && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedArticle.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-neutral-700 mb-6 p-4 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors border border-neutral-200/60"
                  >
                    <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="flex-1">{selectedArticle.address}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </a>
                )}

                {selectedArticle.contentMarkdown && (
                  <div
                    className="prose prose-neutral max-w-none mb-8 prose-img:rounded-2xl prose-headings:text-neutral-900 prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-p:whitespace-pre-line prose-a:text-emerald-600"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.contentMarkdown }}
                  />
                )}

                <button
                  onClick={() => setSelectedArticle(null)}
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
