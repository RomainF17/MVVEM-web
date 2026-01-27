import type { Recommendation, RecommendationFormData } from '../types/recommendation';

const API_BASE = '/api/admin/recommendations';

export async function fetchRecommendations(): Promise<Recommendation[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Erreur lors du chargement des recommandations');
  return response.json();
}

export async function fetchRecommendation(id: string): Promise<Recommendation> {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) throw new Error('Recommandation non trouvée');
  return response.json();
}

export async function createRecommendation(data: RecommendationFormData): Promise<{ id: string }> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      tags: JSON.stringify(data.tags),
    }),
  });
  if (!response.ok) throw new Error('Erreur lors de la création');
  return response.json();
}

export async function updateRecommendation(id: string, data: Partial<RecommendationFormData>): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      tags: data.tags ? JSON.stringify(data.tags) : undefined,
    }),
  });
  if (!response.ok) throw new Error('Erreur lors de la mise à jour');
}

export async function deleteRecommendation(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erreur lors de la suppression');
}
