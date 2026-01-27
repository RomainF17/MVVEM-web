import type { Article, ArticleFormData } from './types';

const API_BASE = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
    throw new Error(error.error || `Erreur ${response.status}`);
  }
  return response.json();
}

export async function fetchArticles(): Promise<Article[]> {
  const response = await fetch(`${API_BASE}/admin/articles`);
  return handleResponse<Article[]>(response);
}

export async function fetchArticle(id: string): Promise<Article> {
  const response = await fetch(`${API_BASE}/admin/articles/${id}`);
  return handleResponse<Article>(response);
}

export async function createArticle(data: ArticleFormData): Promise<{ id: string }> {
  const response = await fetch(`${API_BASE}/admin/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<{ id: string }>(response);
}

export async function updateArticle(id: string, data: Partial<ArticleFormData>): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<void>(response);
}

export async function deleteArticle(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/articles/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(response);
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse<{ url: string }>(response);
}
