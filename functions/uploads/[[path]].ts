interface Env {
  IMAGES: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const pathParts = params.path as string[];
  const key = `images/${pathParts.join('/')}`;
  
  try {
    const object = await env.IMAGES.get(key);
    
    if (!object) {
      return new Response('Image non trouvée', { status: 404 });
    }
    
    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000');
    headers.set('ETag', object.etag);
    
    return new Response(object.body, { headers });
  } catch (error) {
    console.error('Image fetch error:', error);
    return new Response('Erreur serveur', { status: 500 });
  }
};
