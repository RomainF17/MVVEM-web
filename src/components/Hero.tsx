import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Leaf, TreePine, Flower2 } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { useRef } from 'react';

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
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.1, 1],
      y: [0, -20, 0],
      rotate: [0, 5, 0]
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
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 mesh-bg" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
        animate={{
          background: [
            'radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(16,185,129,0.2) 50%, transparent 70%)',
            'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(5,150,105,0.2) 50%, transparent 70%)',
            'radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(16,185,129,0.2) 50%, transparent 70%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20"
        animate={{
          background: [
            'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(4,120,87,0.2) 50%, transparent 70%)',
            'radial-gradient(circle, rgba(34,197,94,0.5) 0%, rgba(16,185,129,0.2) 50%, transparent 70%)',
            'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(4,120,87,0.2) 50%, transparent 70%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 1 }}
      />

      {/* Floating decorative elements */}
      <FloatingElement 
        className="absolute top-32 left-[15%] text-primary/40 hidden md:block"
        delay={0}
        duration={7}
      >
        <Leaf className="w-10 h-10" />
      </FloatingElement>
      
      <FloatingElement 
        className="absolute top-48 right-[20%] text-emerald-400/30 hidden md:block"
        delay={1}
        duration={8}
      >
        <TreePine className="w-12 h-12" />
      </FloatingElement>
      
      <FloatingElement 
        className="absolute bottom-40 left-[10%] text-emerald-500/30 hidden md:block"
        delay={2}
        duration={6}
      >
        <Flower2 className="w-8 h-8" />
      </FloatingElement>

      <FloatingElement 
        className="absolute bottom-60 right-[8%] text-primary/20 hidden md:block"
        delay={0.5}
        duration={9}
      >
        <Sparkles className="w-6 h-6" />
      </FloatingElement>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/5 mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold text-secondary">Application Citoyenne Mobile</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            
            {/* Main headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-secondary leading-[1.1] mb-8"
            >
              La{' '}
              <span className="relative inline-block">
                <span className="gradient-text-animated">végétalisation</span>
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-4" 
                  viewBox="0 0 200 20" 
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  <motion.path 
                    d="M0 15 Q 50 5 100 15 Q 150 25 200 15" 
                    stroke="url(#gradient)" 
                    strokeWidth="4" 
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
              <br />
              à portée de main
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-secondary/70 mb-10 max-w-xl leading-relaxed font-medium"
            >
              Construisons ensemble les villes de demain. 
              <span className="text-secondary font-semibold"> Plus vertes, plus solidaires, plus humaines.</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button className="group relative bg-gradient-to-r from-primary to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-1 flex items-center justify-center gap-3">
                <span className="relative z-10">Découvrir l'App</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="group bg-white/80 backdrop-blur-sm border-2 border-secondary/10 text-secondary px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-primary border-b-[6px] border-b-transparent ml-1" />
                </div>
                Voir la vidéo
              </button>
            </motion.div>
            
            {/* Social proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[
                  'from-emerald-400 to-emerald-600',
                  'from-green-400 to-green-600',
                  'from-teal-400 to-teal-600',
                  'from-primary to-emerald-500'
                ].map((gradient, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0, x: -10 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} border-2 border-white shadow-lg flex items-center justify-center`}
                  >
                    <span className="text-white text-xs font-bold">{['A', 'J', 'M', 'R'][i]}</span>
                  </motion.div>
                ))}
              </div>
              <div className="border-l border-secondary/10 pl-6">
                <p className="text-secondary font-bold text-lg">+2000</p>
                <p className="text-secondary/60 text-sm">citoyens engagés</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Phone Mockup - Desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 60, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex justify-center perspective-1000"
          >
            {/* Glow effect behind phone */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/30 to-emerald-400/20 blur-[80px] animate-pulse-slow" />
            </div>
            
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[450px] h-[450px] rounded-full border border-primary/10 animate-spin-slow" />
              <div className="absolute w-[380px] h-[380px] rounded-full border border-emerald-400/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            </div>
            
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <PhoneMockup
                src="/images/hero-app.PNG"
                alt="Aperçu de l'application Ma Ville Verte et Moi"
                className="w-[340px] drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Phone */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:hidden mt-16 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-emerald-400/10 blur-[60px]" />
            </div>
            <PhoneMockup
              src="/images/hero-app.PNG"
              alt="Aperçu de l'application Ma Ville Verte et Moi"
              className="w-[280px] relative z-10"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-secondary/50 font-medium">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-secondary/20 flex justify-center pt-2"
        >
          <motion.div 
            animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
