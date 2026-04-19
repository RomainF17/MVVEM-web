import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, ArrowRight, X, Send, Loader2, Check } from 'lucide-react';

export const JoinCTA = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setSent(true);

      setTimeout(() => {
        setSent(false);
        setShowContactModal(false);
        setFormData({ email: '', subject: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-neutral-950">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-neutral-300 text-sm font-medium mb-10">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            Rejoignez-nous
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6 leading-[1.1] tracking-tight">
            Prêt à végétaliser <span className="text-emerald-400">votre ville</span> ?
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Téléchargez l'application et rejoignez une communauté engagée pour un environnement urbain plus vert et plus durable.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <button className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-white text-neutral-900 font-medium rounded-full hover:bg-neutral-100 transition-colors duration-200 text-base">
              <Download className="w-4 h-4" />
              <span>Télécharger sur iOS</span>
            </button>

            <button
              onClick={() => setShowContactModal(true)}
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-transparent text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-colors duration-200 text-base"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-neutral-500 text-sm">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
              100% Gratuit
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
              Disponible sur iOS
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
              Made in France
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/70 backdrop-blur-md"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 pb-6 relative">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-6 right-6 w-9 h-9 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors text-neutral-500"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-neutral-900 leading-tight tracking-tight">Nous contacter</h3>
                <p className="text-neutral-500 mt-2">Envoyez-nous un message, nous vous répondrons rapidement.</p>
              </div>

              {/* Form */}
              <div className="px-8 pb-8 overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5 ml-0.5">
                      Votre email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-neutral-900 placeholder-neutral-400"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5 ml-0.5">
                      Objet
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-neutral-900 placeholder-neutral-400"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5 ml-0.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none outline-none text-neutral-900 placeholder-neutral-400"
                      placeholder="Écrivez votre message ici..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : sent ? (
                      <span>✓ Message envoyé !</span>
                    ) : (
                      <>
                        <span>Envoyer le message</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-neutral-400">
                    Nous vous répondrons dans les plus brefs délais
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
