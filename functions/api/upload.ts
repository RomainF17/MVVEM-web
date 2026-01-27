interface Env {
  IMAGES: R2Bucket;
}

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status);
}

function generateImageKey(filename: string): string {
  const ext = filename.split('.').pop() || 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `images/${timestamp}_${random}.${ext}`;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return errorResponse('Aucun fichier fourni');
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse('Type de fichier non autorisé. Utilisez JPG, PNG, GIF ou WebP.');
    }
    
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return errorResponse('Fichier trop volumineux. Maximum 10 Mo.');
    }
    
    const key = generateImageKey(file.name);
    const arrayBuffer = await file.arrayBuffer();
    
    await env.IMAGES.put(key, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });
    
    // Return the public URL for the image
    // The actual URL depends on your R2 public access configuration
    const imageUrl = `/uploads/${key.replace('images/', '')}`;
    
    return jsonResponse({
      url: imageUrl,
      key: key,
      message: 'Image uploadée avec succès',
    }, 201);
  } catch (error) {
    console.error('Upload error:', error);
    return errorResponse('Erreur lors de l\'upload', 500);
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: corsHeaders() });
};
