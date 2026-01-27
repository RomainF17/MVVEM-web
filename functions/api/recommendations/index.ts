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

const BASE_URL = 'https://mvvem-web.pages.dev';

function convertRelativeUrls(text: string | null): string | null {
  if (!text) return text;
  return text.replace(/(!\[[^\]]*\])\((\/[^)]+)\)/g, `$1(${BASE_URL}$2)`);
}

function processRecommendation(rec: Recommendation): Recommendation {
  return {
    ...rec,
    coverImageUrl: rec.coverImageUrl?.startsWith('/') 
      ? BASE_URL + rec.coverImageUrl 
      : rec.coverImageUrl,
    contentMarkdown: convertRelativeUrls(rec.contentMarkdown),
  };
}

// GET /api/recommendations - List published recommendations
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const result = await env.DB.prepare(
      `SELECT id, title, summary, category, tags, coverImageUrl, address, publishedAt, updatedAt 
       FROM recommendations 
       WHERE status = 'published' 
       ORDER BY publishedAt DESC`
    ).all<Recommendation>();
    
    const recommendations = result.results.map(processRecommendation);
    return jsonResponse(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
