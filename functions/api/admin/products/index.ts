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

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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

// GET /api/admin/products - List all products with their images
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const productsResult = await env.DB.prepare(
      `SELECT * FROM products ORDER BY updatedAt DESC`
    ).all<Product>();

    const products = productsResult.results;

    if (products.length === 0) {
      return jsonResponse([]);
    }

    const imagesResult = await env.DB.prepare(
      `SELECT id, product_id, url, position FROM product_images ORDER BY position ASC`
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

// POST /api/admin/products - Create product
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  try {
    const body = await request.json() as Partial<Product> & { images?: { url: string; position: number }[] };

    if (!body.title || body.title.trim() === '') {
      return jsonResponse({ error: 'Le titre est requis' }, 400);
    }

    const id = generateId('prod');
    const now = new Date().toISOString();
    const status = body.status || 'draft';
    const images = body.images || [];

    // Determine imageUrl from first image
    const firstImageUrl = images.length > 0 ? images[0].url : (body.imageUrl || null);

    const statements: D1PreparedStatement[] = [
      env.DB.prepare(
        `INSERT INTO products (id, title, description, category, price, imageUrl, affiliateLink, status, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        id,
        body.title,
        body.description || null,
        body.category || null,
        body.price || null,
        firstImageUrl,
        body.affiliateLink || null,
        status,
        now,
        now
      ),
    ];

    for (const img of images) {
      const imgId = generateId('img');
      statements.push(
        env.DB.prepare(
          `INSERT INTO product_images (id, product_id, url, position) VALUES (?, ?, ?, ?)`
        ).bind(imgId, id, img.url, img.position)
      );
    }

    await env.DB.batch(statements);

    return jsonResponse({ id, message: 'Produit créé' }, 201);
  } catch (error) {
    console.error('Error creating product:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
