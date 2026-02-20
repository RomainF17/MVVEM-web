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

    const product = await env.DB.prepare(
      `SELECT * FROM products WHERE id = ?`
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

    const body = await request.json() as Partial<Product> & { images?: { url: string; position: number }[] };
    const now = new Date().toISOString();
    const images = body.images || [];

    // Determine imageUrl from first image
    const firstImageUrl = images.length > 0 ? images[0].url : (body.imageUrl ?? existing.imageUrl);

    const statements: D1PreparedStatement[] = [
      env.DB.prepare(
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
        firstImageUrl,
        body.affiliateLink ?? existing.affiliateLink,
        body.status ?? existing.status,
        now,
        id
      ),
      // Delete all existing images for this product
      env.DB.prepare(`DELETE FROM product_images WHERE product_id = ?`).bind(id),
    ];

    // Insert new images
    for (const img of images) {
      const imgId = generateId('img');
      statements.push(
        env.DB.prepare(
          `INSERT INTO product_images (id, product_id, url, position) VALUES (?, ?, ?, ?)`
        ).bind(imgId, id, img.url, img.position)
      );
    }

    await env.DB.batch(statements);

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

    // product_images rows are deleted automatically via ON DELETE CASCADE
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
