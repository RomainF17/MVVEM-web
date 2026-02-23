import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Upload, Link, ShoppingBag, X, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import type { ProductFormData } from '../types/product';
import { fetchProduct, createProduct, updateProduct } from '../api/products';
import { uploadImage } from '../api';
import { RichTextEditor } from './RichTextEditor';

interface ProductEditorProps {
  productId: string | null;
  onBack: () => void;
  onSaved: () => void;
}

const CATEGORIES = [
  'Pots/Bacs',
  'Maison écologique',
  'Graines/Plants',
  'Potagers d\'intérieurs',
  'Transport',
  'Énergie',
  'Mode durable',
  'Cosmétiques',
  'Autre',
];

const emptyForm: Omit<ProductFormData, 'images' | 'imageUrl'> = {
  title: '',
  description: '',
  category: '',
  price: null,
  affiliateLink: '',
  status: 'draft',
};

interface ImageEntry {
  url: string;
  position: number;
}

export function ProductEditor({ productId, onBack, onSaved }: ProductEditorProps) {
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const isEditing = productId !== null;

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
  }, [productId]);

  const loadProduct = async (id: string) => {
    try {
      setLoading(true);
      const product = await fetchProduct(id);
      setForm({
        title: product.title,
        description: product.description || '',
        category: product.category || '',
        price: product.price,
        affiliateLink: product.affiliateLink || '',
        status: product.status,
      });
      // Load images from product, fallback to imageUrl if no images array
      if (product.images && product.images.length > 0) {
        setImages(product.images.map((img, i) => ({ url: img.url, position: i })));
      } else if (product.imageUrl) {
        setImages([{ url: product.imageUrl, position: 0 }]);
      }
    } catch (err) {
      setError('Erreur lors du chargement du produit');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setUploadingCount(fileArray.length);

    try {
      const uploadedUrls: string[] = [];
      for (const file of fileArray) {
        const result = await uploadImage(file);
        uploadedUrls.push(result.url);
        setUploadingCount((prev) => prev - 1);
      }

      setImages((prev) => {
        const newImages = [...prev];
        for (const url of uploadedUrls) {
          newImages.push({ url, position: newImages.length });
        }
        return newImages;
      });
    } catch (err) {
      alert("Erreur lors de l'upload des images");
      console.error(err);
      setUploadingCount(0);
    }

    // Reset input so same files can be selected again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index).map((img, i) => ({ ...img, position: i })));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    setImages((prev) => {
      const next = [...prev];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= next.length) return prev;
      [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
      return next.map((img, i) => ({ ...img, position: i }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError('Le titre est requis');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const imagesWithPositions = images.map((img, i) => ({ url: img.url, position: i }));
      const firstImageUrl = images.length > 0 ? images[0].url : '';

      const formData: ProductFormData = {
        ...form,
        imageUrl: firstImageUrl,
        images: imagesWithPositions,
      };

      if (isEditing) {
        await updateProduct(productId, formData);
      } else {
        await createProduct(formData);
      }

      onSaved();
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour aux produits
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="w-6 h-6 text-emerald-600" />
          <h1 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Modifier le produit' : 'Nouveau produit'}
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos du produit
            </label>

            {/* Image grid */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {images.map((img, index) => (
                  <div key={index} className="relative group w-28 h-28">
                    <img
                      src={img.url}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    {/* Principale badge */}
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 right-1 text-center text-[10px] font-bold bg-emerald-600 text-white rounded px-1 py-0.5 leading-none">
                        Principale
                      </span>
                    )}
                    {/* Controls overlay */}
                    <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveImage(index, 'up')}
                        disabled={index === 0}
                        className="w-7 h-7 bg-white rounded flex items-center justify-center disabled:opacity-30 hover:bg-gray-100"
                        title="Déplacer avant"
                      >
                        <ChevronUp className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="w-7 h-7 bg-red-500 rounded flex items-center justify-center hover:bg-red-600"
                        title="Supprimer"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(index, 'down')}
                        disabled={index === images.length - 1}
                        className="w-7 h-7 bg-white rounded flex items-center justify-center disabled:opacity-30 hover:bg-gray-100"
                        title="Déplacer après"
                      >
                        <ChevronDown className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Upload spinner placeholder(s) */}
                {uploadingCount > 0 && Array.from({ length: uploadingCount }).map((_, i) => (
                  <div key={`uploading-${i}`} className="w-28 h-28 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                ))}
              </div>
            )}

            {/* Add images button */}
            <label className={`cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors ${uploadingCount > 0 ? 'opacity-50 pointer-events-none' : ''}`}>
              <Upload className="w-4 h-4" />
              {images.length === 0 ? 'Ajouter des photos' : 'Ajouter d\'autres photos'}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesUpload}
                className="hidden"
                disabled={uploadingCount > 0}
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              JPG, PNG, WebP. Max 10 Mo par photo. Passez la souris sur une photo pour la réordonner ou la supprimer.
            </p>
          </div>

          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Nom du produit"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <RichTextEditor
              content={form.description}
              onChange={(content) => setForm({ ...form, description: content })}
              placeholder="Description du produit..."
            />
          </div>

          {/* Catégorie et Prix */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Sélectionner...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (€)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price ?? ''}
                onChange={(e) => setForm({ ...form, price: e.target.value ? parseFloat(e.target.value) : null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="19.99"
              />
            </div>
          </div>

          {/* Lien d'affiliation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Link className="w-4 h-4 inline mr-1" />
              Lien d'affiliation
            </label>
            <input
              type="url"
              value={form.affiliateLink}
              onChange={(e) => setForm({ ...form, affiliateLink: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="https://..."
            />
          </div>

          {/* Statut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={form.status === 'draft'}
                  onChange={() => setForm({ ...form, status: 'draft' })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Brouillon</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={form.status === 'published'}
                  onChange={() => setForm({ ...form, status: 'published' })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Publié</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving || uploadingCount > 0}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
