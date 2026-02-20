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

interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  position: number;
}

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
      ...corsHeaders(),
    },
  });
}

// GET /api/products/:id - Get single published product with its images
export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  try {
    const id = params.id as string;

    const product = await env.DB.prepare(
      `SELECT * FROM products WHERE id = ? AND status = 'published'`
    ).bind(id).first<Product>();

    if (!product) {
      return jsonResponse({ error: 'Produit non trouvé' }, 404);
    }

    const imagesResult = await env.DB.prepare(
      `SELECT id, product_id, url, position FROM product_images WHERE product_id = ? ORDER BY position ASC`
    ).bind(id).all<ProductImage>();

    return jsonResponse({ ...product, images: imagesResult.results });
  } catch (error) {
    console.error('Error fetching product:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
