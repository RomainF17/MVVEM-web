interface Env {
  RESEND_API_KEY?: string;
}

interface ContactRequest {
  email: string;
  subject: string;
  message: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json() as ContactRequest;
    const { email, subject, message } = body;

    if (!email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Tous les champs sont requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Vérifier si la clé API Resend est configurée
    const resendApiKey = context.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      // Fallback: log le message (pour le développement)
      console.log('Contact form submission:', { email, subject, message });
      
      // En production sans clé API, on retourne quand même un succès
      // mais on pourrait aussi stocker dans D1
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Message reçu (mode développement)' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Envoyer l'email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ma Ville Verte <onboarding@resend.dev>',
        to: ['mavilleverte@proton.me'],
        subject: `[Contact] ${subject}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>De:</strong> ${email}</p>
          <p><strong>Objet:</strong> ${subject}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        reply_to: email,
      }),
    });

    const responseData = await resendResponse.json();
    
    if (!resendResponse.ok) {
      console.error('Resend error:', JSON.stringify(responseData));
      return new Response(JSON.stringify({ 
        error: 'Erreur lors de l\'envoi de l\'email',
        details: responseData 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Message envoyé avec succès',
      id: responseData.id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
