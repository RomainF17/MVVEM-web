import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, ArrowRight, Tag } from 'lucide-react';

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

export function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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
      <section id="articles" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />
      
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm tracking-wider uppercase mb-6"
          >
            <Newspaper className="w-4 h-4" />
            Actualités
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Restez <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">informé</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les dernières actualités et initiatives vertes de votre ville
          </p>
        </motion.div>

        {articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun article pour le moment</p>
            <p className="text-gray-400 mt-2">Revenez bientôt pour découvrir nos actualités</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => openArticleDetail(article.id)}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
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
                  {/* Category badge */}
                  {article.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-700 shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.publishedAt)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  {article.summary && (
                    <p className="text-gray-600 line-clamp-3 mb-4 whitespace-pre-wrap">
                      {article.summary}
                    </p>
                  )}

                  {/* Read more */}
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
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedArticle.coverImageUrl && (
              <img
                src={selectedArticle.coverImageUrl}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
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
                <div className="flex items-center gap-2 text-gray-500 mb-6 p-4 bg-gray-50 rounded-xl">
                  <Tag className="w-5 h-5" />
                  {selectedArticle.address}
                </div>
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
    </section>
  );
}
