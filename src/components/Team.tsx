import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, Users, ArrowRight, Sparkles, Download, Mail } from 'lucide-react';

const team = [
  { name: "Audrey", role: "Co-fondatrice", gradient: "from-pink-500 to-rose-500" },
  { name: "Jacky", role: "Co-fondateur", gradient: "from-blue-500 to-indigo-500" },
  { name: "Maxime", role: "Co-fondateur", gradient: "from-amber-500 to-orange-500" },
  { name: "Romain", role: "Co-fondateur", gradient: "from-emerald-500 to-teal-500" },
];

export const Team = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    
    try {
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
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section id="team" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-30" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wider uppercase mb-6"
          >
            <Users className="w-4 h-4" />
            Qui sommes-nous ?
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6">
            Une équipe{' '}
            <span className="gradient-text">passionnée</span>
          </h2>
          
          <p className="text-xl text-secondary/60 max-w-3xl mx-auto leading-relaxed">
            Quatre passionnés de nouvelles technologies et anciens apprenants de l'Apple Foundation Program, 
            souhaitant faire avancer la société à travers des idées qui font sens.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="relative bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500 text-center">
                {/* Avatar */}
                <div className="relative mb-6 inline-block">
                  {/* Glow effect */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-110`}
                  />
                  
                  {/* Avatar circle */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className={`relative w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-3xl lg:text-4xl font-display font-bold text-white">
                      {member.name[0]}
                    </span>
                  </motion.div>
                  
                  {/* Decorative ring */}
                  <div className={`absolute inset-0 rounded-full border-2 border-dashed opacity-0 group-hover:opacity-30 transition-opacity duration-500 scale-125`}
                       style={{ borderColor: member.gradient.includes('pink') ? '#ec4899' : 
                                            member.gradient.includes('blue') ? '#3b82f6' :
                                            member.gradient.includes('amber') ? '#f59e0b' : '#10b981' }} />
                </div>
                
                {/* Info */}
                <h3 className="text-xl lg:text-2xl font-bold text-secondary mb-1">{member.name}</h3>
                <p className={`font-medium text-sm bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-secondary via-secondary to-emerald-950 rounded-[2.5rem] p-10 md:p-16 lg:p-20 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
            
            {/* Pattern overlay */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }}
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-primary font-bold text-sm tracking-wider uppercase mb-8 border border-white/10"
              >
                <Sparkles className="w-4 h-4" />
                Rejoignez-nous
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Prêt à végétaliser{' '}
                <span className="text-primary">votre ville</span> ?
              </h3>
              
              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Rejoignez la communauté et participez dès aujourd'hui à la construction d'un avenir plus vert.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-gradient-to-r from-primary to-emerald-400 text-secondary px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-glow-lg flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  <Download className="w-5 h-5" />
                  <span>Télécharger l'application</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsContactOpen(true)}
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  <Mail className="w-5 h-5" />
                  <span>Nous contacter</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
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
              className="absolute inset-0 bg-secondary/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              {/* Modal header gradient */}
              <div className="h-2 bg-gradient-to-r from-primary via-emerald-400 to-teal-500" />
              
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-secondary">Nous écrire</h3>
                    <p className="text-secondary/60 text-sm mt-1">Nous vous répondrons rapidement</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsContactOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-secondary/50" />
                  </motion.button>
                </div>

                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="w-20 h-20 bg-gradient-to-br from-primary to-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30"
                    >
                      <CheckCircle className="w-10 h-10" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-secondary mb-2">Message envoyé !</h4>
                    <p className="text-secondary/60">Nous vous répondrons dans les plus brefs délais.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-secondary mb-2">Votre Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:bg-white outline-none transition-all text-secondary placeholder:text-secondary/40"
                        placeholder="exemple@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-secondary mb-2">Votre Message</label>
                      <textarea 
                        name="message"
                        required
                        rows={4}
                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-primary focus:bg-white outline-none transition-all resize-none text-secondary placeholder:text-secondary/40"
                        placeholder="Bonjour, je souhaiterais..."
                      />
                    </div>
                    
                    {formStatus === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm text-center bg-red-50 py-3 rounded-xl"
                      >
                        Une erreur est survenue. Réessayez plus tard.
                      </motion.p>
                    )}

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-gradient-to-r from-primary to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    </motion.button>
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
