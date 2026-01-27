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
  // Convert relative URLs to absolute URLs for images
  return text.replace(/(!\[[^\]]*\])\((\/[^)]+)\)/g, `$1(${BASE_URL}$2)`);
}

function processArticle(article: Article): Article {
  return {
    ...article,
    coverImageUrl: article.coverImageUrl?.startsWith('/') 
      ? BASE_URL + article.coverImageUrl 
      : article.coverImageUrl,
    contentMarkdown: convertRelativeUrls(article.contentMarkdown),
  };
}

// GET /api/articles/:id - Get single published article
export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  try {
    const id = params.id as string;
    
    const result = await env.DB.prepare(
      `SELECT * FROM articles WHERE id = ? AND status = 'published'`
    ).bind(id).first<Article>();
    
    if (!result) {
      return jsonResponse({ error: 'Article non trouvé' }, 404);
    }
    
    return jsonResponse(processArticle(result));
  } catch (error) {
    console.error('Error fetching article:', error);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders() });
};
