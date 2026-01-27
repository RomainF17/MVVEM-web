import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Save, Send, Undo2, Upload, Star } from 'lucide-react';
import type { RecommendationFormData } from '../types/recommendation';
import { fetchRecommendation, createRecommendation, updateRecommendation } from '../api/recommendations';
import { uploadImage } from '../api';
import { RichTextEditor } from './RichTextEditor';

interface RecommendationEditorProps {
  recommendationId: string | null;
  onBack: () => void;
  onSaved: () => void;
}

const CATEGORIES = [
  'Restaurants',
  'Commerces',
  'Loisirs',
  'Nature',
  'Culture',
  'Services',
  'Autre',
];

export function RecommendationEditor({ recommendationId, onBack, onSaved }: RecommendationEditorProps) {
  const [loading, setLoading] = useState(!!recommendationId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [form, setForm] = useState<RecommendationFormData>({
    title: '',
    summary: '',
    category: '',
    tags: [],
    coverImageUrl: '',
    contentMarkdown: '',
    address: '',
    status: 'draft',
  });

  const [originalStatus, setOriginalStatus] = useState<'draft' | 'published'>('draft');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (recommendationId) {
      loadRecommendation(recommendationId);
    }
  }, [recommendationId]);

  const loadRecommendation = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const rec = await fetchRecommendation(id);
      
      const tags = rec.tags ? JSON.parse(rec.tags) : [];
      
      setForm({
        title: rec.title,
        summary: rec.summary || '',
        category: rec.category || '',
        tags,
        coverImageUrl: rec.coverImageUrl || '',
        contentMarkdown: rec.contentMarkdown || '',
        address: rec.address || '',
        status: rec.status,
      });
      setOriginalStatus(rec.status);
      setTagsInput(tags.join(', '));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publish: boolean = false) => {
    if (!form.title.trim()) {
      setError('Le titre est requis');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const data: RecommendationFormData = {
        ...form,
        status: publish ? 'published' : 'draft',
        tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (recommendationId) {
        await updateRecommendation(recommendationId, data);
      } else {
        await createRecommendation(data);
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleUnpublish = async () => {
    if (!recommendationId) return;
    
    try {
      setSaving(true);
      await updateRecommendation(recommendationId, { status: 'draft' });
      setForm({ ...form, status: 'draft' });
      setOriginalStatus('draft');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const result = await uploadImage(file);
      setForm({ ...form, coverImageUrl: result.url });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur d\'upload');
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        <div className="flex items-center gap-3">
          {originalStatus === 'published' && (
            <button
              onClick={handleUnpublish}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <Undo2 className="w-4 h-4" />
              Dépublier
            </button>
          )}
          
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Enregistrer
          </button>
          
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Publier
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <Star className="w-6 h-6 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            {recommendationId ? 'Modifier la recommandation' : 'Nouvelle recommandation'}
          </h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Titre de la recommandation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Résumé
          </label>
          <textarea
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Courte description"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
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
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="bio, local, famille"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image de couverture
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={form.coverImageUrl}
              onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="URL de l'image ou uploader"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
          {form.coverImageUrl && (
            <img
              src={form.coverImageUrl}
              alt="Couverture"
              className="mt-4 max-h-48 rounded-lg object-cover"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenu
          </label>
          <RichTextEditor
            content={form.contentMarkdown}
            onChange={(content) => setForm({ ...form, contentMarkdown: content })}
            placeholder="Écrivez votre recommandation..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Ex: 12 rue de la Nature, 75001 Paris"
          />
        </div>
      </div>
    </div>
  );
}
