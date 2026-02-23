import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, ArrowRight, X, Send, Loader2, Sparkles, Sprout, Leaf } from 'lucide-react';

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

      // Réinitialiser après 2 secondes
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
    <section className="py-32 px-6 relative overflow-hidden bg-gray-900">
      {/* Immersive background aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw]"
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(16,185,129,0.3)_360deg)] rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_90deg,transparent_0_340deg,rgba(20,184,166,0.3)_360deg)] rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg,transparent_0_340deg,rgba(52,211,153,0.3)_360deg)] rounded-full blur-[100px]" />
        </motion.div>

        {/* Deep background color mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/50 to-emerald-950" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-24 shadow-2xl relative overflow-hidden"
        >
          {/* Inner card glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/20 blur-[100px] rounded-full" />

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-bold text-sm tracking-wider uppercase mb-10 shadow-sm backdrop-blur-md"
            >
              <Smartphone className="w-4 h-4" />
              Rejoignez-nous
            </motion.div>

            {/* Title */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Prêt à végétaliser{' '}
              <br className="hidden sm:block" />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">votre ville</span>
              </span>
              {' '}?
            </h2>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-emerald-50/70 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
              Téléchargez l'application et rejoignez une communauté engagée pour un environnement urbain plus vert et plus durable.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-white text-emerald-950 font-bold rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <Download className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Télécharger sur iOS</span>
              </motion.button>

              <motion.button
                onClick={() => setShowContactModal(true)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all text-lg"
              >
                Nous contacter
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-emerald-200/50 text-sm font-semibold tracking-wide uppercase"
            >
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4" />
                100% Gratuit
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Disponible sur iOS
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Made in France
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Ultra-Premium Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2.5rem] max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 opacity-10 pointer-events-none" />

              {/* Header */}
              <div className="p-8 pb-6 relative z-10">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 hover:rotate-90 transition-all text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                  <Send className="w-6 h-6 text-white ml-0.5" />
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900 leading-tight">Nous contacter</h3>
                <p className="text-gray-500 font-medium mt-2 text-lg">Envoyez-nous un message, nous vous répondrons rapidement !</p>
              </div>

              {/* Form */}
              <div className="px-8 pb-8 overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                      Votre email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-medium text-gray-900 placeholder-gray-400"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                      Objet
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-medium text-gray-900 placeholder-gray-400"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none outline-none font-medium text-gray-900 placeholder-gray-400"
                      placeholder="Écrivez votre message ici..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-lg mt-2"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : sent ? (
                      <>
                        <span>✓ Message envoyé !</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer le message</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm font-medium text-gray-400">
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
