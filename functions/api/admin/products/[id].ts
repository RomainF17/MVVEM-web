interface Env {
  DB: D1Database;
}

interface Product {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number | null;
  imageUrl: string | null;
  affiliateLink: string | null;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
  });
}

// GET /api/admin/products/:id
export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  try {
    const id = params.id as string;
    
    const result = await env.DB.prepare(
      `SELECT * FROM products WHERE id = ?`
    ).bind(id).first<Product>();
    
    if (!result) {
      return jsonResponse({ error: 'Produit non trouvé' }, 404);
    }
    
    return jsonResponse(result);
  } catch (error) {
    console.error('Error fetching product:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

// PUT /api/admin/products/:id
export const onRequestPut: PagesFunction<Env> = async ({ env, params, request }) => {
  try {
    const id = params.id as string;
    
    const existing = await env.DB.prepare(
      `SELECT * FROM products WHERE id = ?`
    ).bind(id).first<Product>();
    
    if (!existing) {
      return jsonResponse({ error: 'Produit non trouvé' }, 404);
    }
    
    const body = await request.json() as Partial<Product>;
    const now = new Date().toISOString();
    
    await env.DB.prepare(
      `UPDATE products SET 
        title = ?, 
        description = ?, 
        category = ?, 
        price = ?, 
        imageUrl = ?, 
        affiliateLink = ?, 
        status = ?, 
        updatedAt = ?
       WHERE id = ?`
    ).bind(
      body.title ?? existing.title,
      body.description ?? existing.description,
      body.category ?? existing.category,
      body.price ?? existing.price,
      body.imageUrl ?? existing.imageUrl,
      body.affiliateLink ?? existing.affiliateLink,
      body.status ?? existing.status,
      now,
      id
    ).run();
    
    return jsonResponse({ message: 'Produit mis à jour' });
  } catch (error) {
    console.error('Error updating product:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

// DELETE /api/admin/products/:id
export const onRequestDelete: PagesFunction<Env> = async ({ env, params }) => {
  try {
    const id = params.id as string;
    
    const result = await env.DB.prepare(
      `DELETE FROM products WHERE id = ?`
    ).bind(id).run();
    
    if (result.meta.changes === 0) {
      return jsonResponse({ error: 'Produit non trouvé' }, 404);
    }
    
    return jsonResponse({ message: 'Produit supprimé' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
