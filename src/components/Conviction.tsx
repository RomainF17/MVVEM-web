import { motion } from 'framer-motion';

export const Conviction = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative bg-neutral-950 rounded-3xl p-7 md:p-20 overflow-hidden">
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10),transparent_60%)] pointer-events-none"
              aria-hidden
            />

            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-[0.2em]">
                  Notre conviction
                </p>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white mb-10 md:mb-16 text-center leading-tight tracking-tight max-w-3xl mx-auto">
                La mobilisation citoyenne au cœur de la{' '}
                <span className="text-emerald-400">transition</span>
              </h3>

              <div className="relative grid md:grid-cols-2 gap-10 md:gap-16">
                <div
                  className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"
                  aria-hidden
                />

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-400/70 tabular-nums">01</span>
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Démocratie locale
                    </span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed text-base md:text-lg">
                    D'un côté, les Français ont soif de démocratie et souhaitent être davantage associés aux décisions qui les concernent au quotidien. De l'autre, la lutte contre le réchauffement climatique implique de tels changements qu'il est impossible de réaliser cette transition sans l'adhésion du plus grand nombre.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-400/70 tabular-nums">02</span>
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Coopération citoyenne
                    </span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed text-base md:text-lg">
                    Qu'il s'agisse d'aménagement urbain, de mobilité ou d'énergie, la coopération des habitants permet d'inventer des réponses inédites. La participation citoyenne est un moyen pragmatique et enthousiaste de mieux fabriquer la cité de demain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
