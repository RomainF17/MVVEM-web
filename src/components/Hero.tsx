import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Leaf, TreePine, Flower2, Play } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

const FloatingElement = ({
  children,
  className,
  delay = 0,
  duration = 6
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.6, 1, 0.6],
      scale: [1, 1.15, 1],
      y: [0, -25, 0],
      rotate: [0, 8, -4, 0]
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24 bg-gradient-to-b from-emerald-50/50 via-white to-white"
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 right-0 w-[1000px] h-[1000px] rounded-full blur-[140px] opacity-40 mix-blend-multiply"
        animate={{
          background: [
            'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(5,150,105,0.1) 50%, transparent 70%)',
            'radial-gradient(circle, rgba(52,211,153,0.3) 0%, rgba(16,185,129,0.1) 50%, transparent 70%)',
            'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(5,150,105,0.1) 50%, transparent 70%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute -bottom-32 -left-40 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30 mix-blend-multiply"
        animate={{
          background: [
            'radial-gradient(circle, rgba(52,211,153,0.4) 0%, rgba(4,120,87,0.1) 50%, transparent 70%)',
            'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(52,211,153,0.1) 50%, transparent 70%)',
            'radial-gradient(circle, rgba(52,211,153,0.4) 0%, rgba(4,120,87,0.1) 50%, transparent 70%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Floating decorative elements */}
      <FloatingElement className="absolute top-40 left-[10%] text-emerald-600/30 hidden md:block" delay={0} duration={7}>
        <Leaf className="w-12 h-12 drop-shadow-lg" />
      </FloatingElement>
      <FloatingElement className="absolute top-52 right-[15%] text-teal-400/40 hidden md:block" delay={1} duration={8}>
        <TreePine className="w-14 h-14 drop-shadow-lg" />
      </FloatingElement>
      <FloatingElement className="absolute bottom-32 left-[15%] text-green-500/40 hidden md:block" delay={2} duration={6}>
        <Flower2 className="w-10 h-10 drop-shadow-lg" />
      </FloatingElement>
      <FloatingElement className="absolute bottom-52 right-[10%] text-emerald-400/30 hidden md:block" delay={0.5} duration={9}>
        <Sparkles className="w-8 h-8 drop-shadow-sm" />
      </FloatingElement>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Super premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-emerald-200/60 shadow-[0_8px_30px_rgb(16,185,129,0.12)] mb-10 overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-teal-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-bold bg-gradient-to-r from-emerald-800 to-teal-800 bg-clip-text text-transparent">Application Citoyenne Mobile</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-8"
            >
              La{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 bg-clip-text text-transparent">végétalisation</span>
                <motion.div
                  className="absolute -bottom-3 left-0 w-full h-5 opacity-80"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                >
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="w-full h-full">
                    <path
                      d="M0 15 Q 50 5 100 15 Q 150 25 200 15"
                      stroke="url(#hero-gradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </span>
              <br className="hidden md:block" />
              {' '}à portée de main
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed lg:leading-[1.6]"
            >
              Construisons ensemble les villes de demain.
              <span className="font-bold text-gray-900 block mt-1"> Plus vertes, plus solidaires, plus humaines.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mb-14"
            >
              <button className="group relative bg-gray-900 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">Découvrir l'App</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button className="group relative bg-white border border-gray-200 text-gray-900 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                  <Play className="w-4 h-4 text-emerald-600 ml-1" fill="currentColor" />
                </div>
                Voir la vidéo
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="flex items-center gap-6 p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm"
            >
              <div className="flex -space-x-4">
                {[
                  'from-emerald-300 to-teal-400',
                  'from-emerald-400 to-emerald-600',
                  'from-teal-400 to-teal-600',
                  'from-green-400 to-emerald-500'
                ].map((gradient, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} border-2 border-white shadow-md flex items-center justify-center relative z-[${4 - i}]`}
                    style={{ zIndex: 4 - i }}
                  >
                    <span className="text-white text-sm font-bold">{['A', 'J', 'M', 'R'][i]}</span>
                  </motion.div>
                ))}
              </div>
              <div className="border-l border-gray-200 pl-6 text-left">
                <div className="flex items-center gap-1 mb-0.5">
                  <p className="text-gray-900 font-extrabold text-xl">+2000</p>
                  <Sparkles className="w-4 h-4 text-amber-400" fill="currentColor" />
                </div>
                <p className="text-gray-500 font-medium text-sm">citoyens engagés</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Phone Mockup Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end mt-16 lg:mt-0 perspective-1000"
          >
            {/* Epic Glow effect behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/40 via-teal-300/20 to-lime-300/30 blur-[100px] animate-pulse-slow mix-blend-multiply" />
            </div>

            {/* Decorative orbit rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-spin-slow" />
              <div className="absolute inset-[40px] rounded-full border border-teal-500/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
              <div className="absolute inset-[80px] rounded-full border border-emerald-400/5 animate-spin-slow" style={{ animationDuration: '20s' }} />

              {/* Orbiting dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[40px] rounded-full"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
              </motion.div>
            </div>

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 2xl:scale-110 origin-center"
            >
              <PhoneMockup
                src="/images/hero-app.PNG"
                alt="Aperçu de l'application Ma Ville Verte et Moi"
                className="w-[300px] sm:w-[320px] lg:w-[380px] drop-shadow-[0_30px_60px_rgba(4,120,87,0.3)] filter contrast-[1.05]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
