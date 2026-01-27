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

function generateId(): string {
  return `prod_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

// GET /api/admin/products - List all products
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const result = await env.DB.prepare(
      `SELECT * FROM products ORDER BY updatedAt DESC`
    ).all<Product>();
    
    return jsonResponse(result.results);
  } catch (error) {
    console.error('Error fetching products:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

// POST /api/admin/products - Create product
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  try {
    const body = await request.json() as Partial<Product>;
    
    if (!body.title || body.title.trim() === '') {
      return jsonResponse({ error: 'Le titre est requis' }, 400);
    }
    
    const id = generateId();
    const now = new Date().toISOString();
    const status = body.status || 'draft';
    
    await env.DB.prepare(
      `INSERT INTO products (id, title, description, category, price, imageUrl, affiliateLink, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      body.title,
      body.description || null,
      body.category || null,
      body.price || null,
      body.imageUrl || null,
      body.affiliateLink || null,
      status,
      now,
      now
    ).run();
    
    return jsonResponse({ id, message: 'Produit créé' }, 201);
  } catch (error) {
    console.error('Error creating product:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
