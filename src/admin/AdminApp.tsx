import { useState, useEffect } from 'react';
import { Leaf, LogOut, FileText, ShoppingBag, Star, Home } from 'lucide-react';
import { ArticleList } from './components/ArticleList';
import { ArticleEditor } from './components/ArticleEditor';
import { ProductList } from './components/ProductList';
import { ProductEditor } from './components/ProductEditor';
import { RecommendationList } from './components/RecommendationList';
import { RecommendationEditor } from './components/RecommendationEditor';
import { LoginForm } from './components/LoginForm';

type Section = 'articles' | 'products' | 'recommendations';
type View = 'list' | 'editor';

export function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [section, setSection] = useState<Section>('articles');
  const [view, setView] = useState<View>('list');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  const handleEdit = (id: string) => {
    setEditingId(id);
    setView('editor');
  };

  const handleNew = () => {
    setEditingId(null);
    setView('editor');
  };

  const handleBack = () => {
    setView('list');
    setEditingId(null);
  };

  const handleSaved = () => {
    setView('list');
    setEditingId(null);
  };

  const switchSection = (newSection: Section) => {
    setSection(newSection);
    setView('list');
    setEditingId(null);
  };

  const renderContent = () => {
    if (section === 'articles') {
      return view === 'list' ? (
        <ArticleList onEdit={handleEdit} onNew={handleNew} />
      ) : (
        <ArticleEditor articleId={editingId} onBack={handleBack} onSaved={handleSaved} />
      );
    } else if (section === 'products') {
      return view === 'list' ? (
        <ProductList onEdit={handleEdit} onNew={handleNew} />
      ) : (
        <ProductEditor productId={editingId} onBack={handleBack} onSaved={handleSaved} />
      );
    } else {
      return view === 'list' ? (
        <RecommendationList onEdit={handleEdit} onNew={handleNew} />
      ) : (
        <RecommendationEditor recommendationId={editingId} onBack={handleBack} onSaved={handleSaved} />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">Ma Ville Verte</span>
                <span className="ml-2 text-sm text-gray-500">Administration</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Home className="w-4 h-4" />
                Accueil
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1">
            <button
              onClick={() => switchSection('articles')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                section === 'articles'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              Articles
            </button>
            <button
              onClick={() => switchSection('products')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                section === 'products'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Boutique
            </button>
            <button
              onClick={() => switchSection('recommendations')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                section === 'recommendations'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Star className="w-4 h-4" />
              Recommandations
            </button>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
