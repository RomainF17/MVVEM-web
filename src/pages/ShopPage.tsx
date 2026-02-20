import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ExternalLink, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductImage {
  id: string;
  url: string;
  position: number;
}

interface Product {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number | null;
  imageUrl: string | null;
  images: ProductImage[];
  affiliateLink: string | null;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

const hasHtmlTags = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value);

const formatProductPreview = (value: string) => {
  if (!hasHtmlTags(value)) {
    return value;
  }

  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h\d)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const formatProductHtml = (value: string) => {
  if (hasHtmlTags(value)) {
    return value;
  }

  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');
};

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const formatPrice = (price: number | null) => {
    if (price === null) return '';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getProductImages = (product: Product): ProductImage[] => {
    if (product.images && product.images.length > 0) return product.images;
    if (product.imageUrl) return [{ id: 'legacy', url: product.imageUrl, position: 0 }];
    return [];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      {/* Background decoration */}
      <div className="fixed top-1/2 right-0 w-[500px] h-[500px] bg-amber-100 rounded-full blur-3xl opacity-20 translate-x-1/2 pointer-events-none" />
      <div className="fixed top-1/4 left-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors font-medium"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 text-amber-700 font-bold text-sm tracking-wider uppercase mb-6"
          >
            <ShoppingBag className="w-4 h-4" />
            Boutique
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Nos <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">sélections</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de produits éco-responsables pour un mode de vie plus vert
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
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
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
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun produit pour le moment</p>
            <p className="text-gray-400 mt-2">Notre boutique arrive bientôt</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              const productImages = getProductImages(product);
              const thumbUrl = productImages[0]?.url || null;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onClick={() => openProduct(product)}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                    {thumbUrl ? (
                      <img
                        src={thumbUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-amber-200" />
                      </div>
                    )}
                    {product.category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-amber-700 shadow-sm">
                          {product.category}
                        </span>
                      </div>
                    )}
                    {productImages.length > 1 && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                          +{productImages.length - 1} photo{productImages.length > 2 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4 whitespace-pre-line">
                        {formatProductPreview(product.description)}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {product.price !== null && (
                        <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                          {formatPrice(product.price)}
                        </span>
                      )}

                      {product.affiliateLink && (
                        <a
                          href={product.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm rounded-full hover:shadow-lg transition-all"
                        >
                          Voir
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (() => {
        const productImages = getProductImages(selectedProduct);
        const hasMultipleImages = productImages.length > 1;
        const currentImage = productImages[currentImageIndex] || null;

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Image carousel */}
              {currentImage && (
                <div className="relative bg-gray-100">
                  <img
                    src={currentImage.url}
                    alt={`${selectedProduct.title} - photo ${currentImageIndex + 1}`}
                    className="w-full h-80 object-contain"
                  />

                  {hasMultipleImages && (
                    <>
                      {/* Prev / Next arrows */}
                      <button
                        onClick={() => setCurrentImageIndex((i) => Math.max(0, i - 1))}
                        disabled={currentImageIndex === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors disabled:opacity-30"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((i) => Math.min(productImages.length - 1, i + 1))}
                        disabled={currentImageIndex === productImages.length - 1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors disabled:opacity-30"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>

                      {/* Dot indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {productImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImageIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === currentImageIndex
                                ? 'bg-amber-500 w-4'
                                : 'bg-white/70 hover:bg-white'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Counter */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                        {currentImageIndex + 1} / {productImages.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="p-8">
                {selectedProduct.category && (
                  <span className="inline-block px-4 py-1.5 bg-amber-100 rounded-full text-sm font-semibold text-amber-700 mb-4">
                    {selectedProduct.category}
                  </span>
                )}

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedProduct.title}
                </h2>

                {selectedProduct.description && (
                  <div
                    className="prose prose-amber max-w-none mb-6 text-lg text-gray-600 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: formatProductHtml(selectedProduct.description) }}
                  />
                )}

                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl mb-6">
                  {selectedProduct.price !== null && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Prix</p>
                      <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                        {formatPrice(selectedProduct.price)}
                      </span>
                    </div>
                  )}

                  {selectedProduct.affiliateLink && (
                    <a
                      href={selectedProduct.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition-all"
                    >
                      Acheter
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </div>
  );
}
