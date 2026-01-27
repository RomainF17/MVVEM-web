import type { Product, ProductFormData } from '../types/product';

const API_BASE = '/api/admin/products';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Erreur lors du chargement des produits');
  return response.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) throw new Error('Produit non trouvé');
  return response.json();
}

export async function createProduct(data: ProductFormData): Promise<{ id: string }> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erreur lors de la création');
  return response.json();
}

export async function updateProduct(id: string, data: Partial<ProductFormData>): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erreur lors de la mise à jour');
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erreur lors de la suppression');
}
