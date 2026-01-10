import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';

const team = [
  { name: "Audrey", role: "Co-fondatrice" },
  { name: "Jacky", role: "Co-fondateur" },
  { name: "Maxime", role: "Co-fondateur" },
  { name: "Romain", role: "Co-fondateur" },
];

export const Team = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    
    try {
      // Remplacez 'YOUR_FORM_ID' par votre ID Formspree (voir instructions)
      const response = await fetch("https://formspree.io/f/xqeezyne", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        setTimeout(() => {
          setIsContactOpen(false);
          setFormStatus('idle');
        }, 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="team" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-wider text-sm uppercase">Qui sommes-nous ?</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mt-2 mb-6">Une équipe passionnée</h2>
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            Quatre passionnés de nouvelles technologies et anciens apprenants de l'Apple Foundation Program, souhaitant faire avancer la société à travers des idées qui font sens.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-4 inline-block">
                <div className="w-32 h-32 rounded-full bg-secondary/5 flex items-center justify-center border-4 border-white shadow-lg mx-auto relative z-10 group-hover:bg-primary/20 transition-colors duration-300">
                   <span className="text-4xl font-display font-bold text-secondary/30 group-hover:text-secondary/60 transition-colors">{member.name[0]}</span>
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 z-0"></div>
              </div>
              <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
              <p className="text-primary font-medium text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-[2.5rem] p-8 md:p-16 text-center shadow-xl border border-secondary/5 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">Prêt à végétaliser votre ville ?</h3>
            <p className="text-lg text-secondary/70 mb-8 max-w-2xl mx-auto">
              Rejoignez la communauté et participez dès aujourd'hui à la construction d'un avenir plus vert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-primary text-secondary px-8 py-3 rounded-full font-bold text-lg hover:bg-primary/90 hover:shadow-lg transition-all w-full sm:w-auto">
                Télécharger l'application
              </button>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="bg-secondary text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-secondary/90 transition-all w-full sm:w-auto"
              >
                Nous contacter
              </button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50 blur-3xl"></div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-display font-bold text-secondary">Nous écrire</h3>
                  <button 
                    onClick={() => setIsContactOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-secondary/50" />
                  </button>
                </div>

                {formStatus === 'success' ? (
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-secondary mb-2">Message envoyé !</h4>
                    <p className="text-secondary/70">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-secondary/70 mb-1">Votre Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="exemple@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-secondary/70 mb-1">Votre Message</label>
                      <textarea 
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                        placeholder="Bonjour, je souhaiterais..."
                      />
                    </div>
                    
                    {formStatus === 'error' && (
                      <p className="text-red-500 text-sm text-center">Une erreur est survenue. Réessayez plus tard.</p>
                    )}

                    <button 
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
