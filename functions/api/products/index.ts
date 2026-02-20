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

// GET /api/products - List published products with their images
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const productsResult = await env.DB.prepare(
      `SELECT id, title, description, category, price, imageUrl, affiliateLink, createdAt, updatedAt
       FROM products
       WHERE status = 'published'
       ORDER BY createdAt DESC`
    ).all<Product>();

    const products = productsResult.results;

    if (products.length === 0) {
      return jsonResponse([]);
    }

    const imagesResult = await env.DB.prepare(
      `SELECT pi.id, pi.product_id, pi.url, pi.position
       FROM product_images pi
       INNER JOIN products p ON pi.product_id = p.id
       WHERE p.status = 'published'
       ORDER BY pi.position ASC`
    ).all<ProductImage>();

    const imagesByProduct: Record<string, ProductImage[]> = {};
    for (const img of imagesResult.results) {
      if (!imagesByProduct[img.product_id]) {
        imagesByProduct[img.product_id] = [];
      }
      imagesByProduct[img.product_id].push(img);
    }

    const productsWithImages = products.map((p) => ({
      ...p,
      images: imagesByProduct[p.id] || [],
    }));

    return jsonResponse(productsWithImages);
  } catch (error) {
    console.error('Error fetching products:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
