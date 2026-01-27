import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ExternalLink, ShoppingBag } from 'lucide-react';
import type { Product } from '../types/product';
import { fetchProducts, deleteProduct } from '../api/products';

interface ProductListProps {
  onEdit: (id: string) => void;
  onNew: () => void;
}

export function ProductList({ onEdit, onNew }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer le produit "${title}" ?`)) return;
    
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
        <button onClick={loadProducts} className="ml-4 underline">Réessayer</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">Produits Boutique</h1>
        </div>
        <button
          onClick={onNew}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau produit
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucun produit pour le moment</p>
          <button
            onClick={onNew}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Créer votre premier produit
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    product.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {product.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
                
                {product.category && (
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                )}
                
                {product.price !== null && (
                  <p className="text-lg font-bold text-emerald-600 mb-3">
                    {product.price.toFixed(2)} €
                  </p>
                )}
                
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => onEdit(product.id)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-emerald-600 py-2"
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </button>
                  {product.affiliateLink && (
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-blue-600 py-2 px-3"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(product.id, product.title)}
                    className="flex items-center justify-center text-sm text-gray-600 hover:text-red-600 py-2 px-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
