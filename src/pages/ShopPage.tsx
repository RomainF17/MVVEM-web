import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
            <ShoppingBag className="w-3.5 h-3.5" />
            Boutique
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-neutral-900 leading-[1.05] tracking-tight mb-5">
            Nos <span className="text-emerald-600">sélections</span>
          </h1>

          <p className="text-base md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre sélection de produits éco-responsables pour un mode de vie plus vert
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

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200/60"
          >
            <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600">Aucun produit pour le moment</p>
            <p className="text-neutral-400 text-sm mt-2">Notre boutique arrive bientôt</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filteredProducts.map((product, index) => {
              const productImages = getProductImages(product);
              const thumbUrl = productImages[0]?.url || null;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => openProduct(product)}
                  className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-52 overflow-hidden bg-neutral-100">
                    {thumbUrl ? (
                      <img
                        src={thumbUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-neutral-300" />
                      </div>
                    )}
                    {product.category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-neutral-700 border border-neutral-200/60">
                          {product.category}
                        </span>
                      </div>
                    )}
                    {productImages.length > 1 && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-1 bg-neutral-900/80 rounded-full text-xs font-medium text-white">
                          +{productImages.length - 1} photo{productImages.length > 2 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-base md:text-lg font-display font-semibold text-neutral-900 mb-2 line-clamp-2 tracking-tight group-hover:text-emerald-600 transition-colors">
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="text-neutral-500 text-sm line-clamp-2 mb-4 whitespace-pre-line leading-relaxed">
                        {formatProductPreview(product.description)}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {product.price !== null && (
                        <span className="text-xl font-display font-semibold text-neutral-900 tracking-tight">
                          {formatPrice(product.price)}
                        </span>
                      )}

                      {product.affiliateLink && (
                        <a
                          href={product.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-neutral-900 text-white font-medium text-xs rounded-full hover:bg-neutral-800 transition-colors"
                        >
                          Voir
                          <ExternalLink className="w-3 h-3" />
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
      <AnimatePresence>
        {selectedProduct && (() => {
          const productImages = getProductImages(selectedProduct);
          const hasMultipleImages = productImages.length > 1;
          const currentImage = productImages[currentImageIndex] || null;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/70"
              onClick={() => setSelectedProduct(null)}
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
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-600" />
                </button>

                {/* Image carousel */}
                {currentImage && (
                  <div className="relative bg-neutral-50">
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
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-30"
                        >
                          <ChevronLeft className="w-4 h-4 text-neutral-700" />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex((i) => Math.min(productImages.length - 1, i + 1))}
                          disabled={currentImageIndex === productImages.length - 1}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-30"
                        >
                          <ChevronRight className="w-4 h-4 text-neutral-700" />
                        </button>

                        {/* Dot indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {productImages.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentImageIndex(i)}
                              className={`h-1.5 rounded-full transition-all ${
                                i === currentImageIndex
                                  ? 'bg-neutral-900 w-5'
                                  : 'bg-neutral-300 hover:bg-neutral-400 w-1.5'
                              }`}
                            />
                          ))}
                        </div>

                        {/* Counter */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-neutral-900/70 rounded-full text-xs font-medium text-white">
                          {currentImageIndex + 1} / {productImages.length}
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="p-8 md:p-10">
                  {selectedProduct.category && (
                    <span className="inline-block px-3 py-1 bg-emerald-50 rounded-full text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-5">
                      {selectedProduct.category}
                    </span>
                  )}

                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-neutral-900 mb-5 tracking-tight leading-tight">
                    {selectedProduct.title}
                  </h2>

                  {selectedProduct.description && (
                    <div
                      className="prose prose-neutral max-w-none mb-8 text-base md:text-lg text-neutral-600 leading-relaxed whitespace-pre-line prose-a:text-emerald-600"
                      dangerouslySetInnerHTML={{ __html: formatProductHtml(selectedProduct.description) }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-4 p-6 bg-neutral-50 rounded-2xl border border-neutral-200/60 mb-6">
                    {selectedProduct.price !== null && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Prix</p>
                        <span className="text-2xl md:text-3xl font-display font-semibold text-neutral-900 tracking-tight">
                          {formatPrice(selectedProduct.price)}
                        </span>
                      </div>
                    )}

                    {selectedProduct.affiliateLink && (
                      <a
                        href={selectedProduct.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors text-sm"
                      >
                        Acheter
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full py-3.5 border border-neutral-200 text-neutral-700 font-medium rounded-full hover:bg-neutral-50 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
