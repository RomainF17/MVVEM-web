interface Env {
  DB: D1Database;
}

interface Article {
  id: string;
  title: string;
  summary: string | null;
  category: string | null;
  tags: string | null;
  coverImageUrl: string | null;
  contentMarkdown: string | null;
  address: string | null;
  status: 'draft' | 'published';
  authorEmail: string | null;
  publishedAt: string | null;
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

// GET /api/admin/articles/:id
export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  try {
    const id = params.id as string;
    
    const result = await env.DB.prepare(
      `SELECT * FROM articles WHERE id = ?`
    ).bind(id).first<Article>();
    
    if (!result) {
      return jsonResponse({ error: 'Article non trouvé' }, 404);
    }
    
    return jsonResponse(result);
  } catch (error) {
    console.error('Error fetching article:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

// PUT /api/admin/articles/:id
export const onRequestPut: PagesFunction<Env> = async ({ env, params, request }) => {
  try {
    const id = params.id as string;
    
    const existing = await env.DB.prepare(
      `SELECT * FROM articles WHERE id = ?`
    ).bind(id).first<Article>();
    
    if (!existing) {
      return jsonResponse({ error: 'Article non trouvé' }, 404);
    }
    
    const body = await request.json() as Partial<Article>;
    const now = new Date().toISOString();
    
    let publishedAt = existing.publishedAt;
    if (body.status === 'published' && existing.status !== 'published') {
      publishedAt = now;
    } else if (body.status === 'draft') {
      publishedAt = null;
    }
    
    await env.DB.prepare(
      `UPDATE articles SET 
        title = ?, 
        summary = ?, 
        category = ?, 
        tags = ?, 
        coverImageUrl = ?, 
        contentMarkdown = ?, 
        address = ?,
        status = ?, 
        authorEmail = ?, 
        publishedAt = ?, 
        updatedAt = ?
       WHERE id = ?`
    ).bind(
      body.title ?? existing.title,
      body.summary ?? existing.summary,
      body.category ?? existing.category,
      body.tags ? (typeof body.tags === 'string' ? body.tags : JSON.stringify(body.tags)) : existing.tags,
      body.coverImageUrl ?? existing.coverImageUrl,
      body.contentMarkdown ?? existing.contentMarkdown,
      body.address ?? existing.address,
      body.status ?? existing.status,
      body.authorEmail ?? existing.authorEmail,
      publishedAt,
      now,
      id
    ).run();
    
    return jsonResponse({ message: 'Article mis à jour' });
  } catch (error) {
    console.error('Error updating article:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

// DELETE /api/admin/articles/:id
export const onRequestDelete: PagesFunction<Env> = async ({ env, params }) => {
  try {
    const id = params.id as string;
    
    const result = await env.DB.prepare(
      `DELETE FROM articles WHERE id = ?`
    ).bind(id).run();
    
    if (result.meta.changes === 0) {
      return jsonResponse({ error: 'Article non trouvé' }, 404);
    }
    
    return jsonResponse({ message: 'Article supprimé' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
