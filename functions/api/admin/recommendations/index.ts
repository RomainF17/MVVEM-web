interface Env {
  DB: D1Database;
}

interface Recommendation {
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

function generateId(): string {
  return `rec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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

// GET /api/admin/recommendations - List all recommendations
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const result = await env.DB.prepare(
      `SELECT * FROM recommendations ORDER BY updatedAt DESC`
    ).all<Recommendation>();
    
    return jsonResponse(result.results);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

// POST /api/admin/recommendations - Create recommendation
export const onRequestPost: PagesFunction<Env> = async ({ env, request }) => {
  try {
    const body = await request.json() as Partial<Recommendation>;
    
    if (!body.title || body.title.trim() === '') {
      return jsonResponse({ error: 'Le titre est requis' }, 400);
    }
    
    const id = generateId();
    const now = new Date().toISOString();
    const status = body.status || 'draft';
    const publishedAt = status === 'published' ? now : null;
    
    await env.DB.prepare(
      `INSERT INTO recommendations (id, title, summary, category, tags, coverImageUrl, contentMarkdown, address, status, authorEmail, publishedAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      body.title,
      body.summary || null,
      body.category || null,
      body.tags ? (typeof body.tags === 'string' ? body.tags : JSON.stringify(body.tags)) : null,
      body.coverImageUrl || null,
      body.contentMarkdown || null,
      body.address || null,
      status,
      body.authorEmail || null,
      publishedAt,
      now
    ).run();
    
    return jsonResponse({ id, message: 'Recommandation créée' }, 201);
  } catch (error) {
    console.error('Error creating recommendation:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
