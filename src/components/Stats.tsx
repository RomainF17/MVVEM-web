import { motion, useInView } from 'framer-motion';
import { TreePine, Wind, ThermometerSun, Users, TrendingUp } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const stats = [
  {
    icon: Users,
    value: 90,
    suffix: "%",
    label: "Des français dépendent des villes",
    source: "Insee",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100/50"
  },
  {
    icon: TreePine,
    value: 85,
    suffix: "%",
    label: "Des français considèrent importante la proximité avec un espace vert",
    source: "",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-100/50"
  },
  {
    icon: Wind,
    value: 100,
    suffix: "g",
    label: "De particules fines piégées par un arbre en ville par an",
    source: "",
    gradient: "from-slate-500 to-slate-600",
    bgGradient: "from-slate-50 to-slate-100/50"
  },
  {
    icon: ThermometerSun,
    value: 5,
    prefix: "-3 à ",
    suffix: "°C",
    label: "Réduction de la température urbaine grâce aux arbres d'ombrage",
    source: "",
    gradient: "from-orange-500 to-amber-600",
    bgGradient: "from-orange-50 to-amber-100/50"
  }
];

const AnimatedNumber = ({ 
  value, 
  prefix = "", 
  suffix = "",
  inView 
}: { 
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, inView]);
  
  return (
    <span className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-background to-white" />
      
      {/* Decorative grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto relative z-10">
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
            <TrendingUp className="w-4 h-4" />
            Un constat
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary">
            Pourquoi agir{' '}
            <span className="gradient-text">maintenant</span> ?
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className={`relative bg-gradient-to-br ${stat.bgGradient} rounded-3xl p-8 border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full`}>
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg mb-6`}
                >
                  <stat.icon className="w-7 h-7" />
                </motion.div>
                
                {/* Value */}
                <div className="mb-4">
                  <span className={`text-5xl font-display font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    <AnimatedNumber 
                      value={stat.value} 
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      inView={isInView}
                    />
                  </span>
                </div>
                
                {/* Label */}
                <p className="text-secondary/70 font-medium leading-snug text-sm">
                  {stat.label}
                  {stat.source && (
                    <span className="text-secondary/40 ml-1">({stat.source})</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom content card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="relative bg-gradient-to-br from-secondary to-secondary/90 rounded-[2rem] p-10 md:p-14 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
              >
                La mobilisation citoyenne au cœur de la{' '}
                <span className="text-primary">transition</span>
              </motion.h3>
              
              <div className="grid md:grid-cols-2 gap-8 text-white/80 leading-relaxed text-lg">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  D'un côté, les Français ont soif de démocratie et souhaitent être davantage associés aux décisions qui les concernent au quotidien. De l'autre, la lutte contre le réchauffement climatique implique de tels changements qu'il est impossible de réaliser cette transition sans l'adhésion du plus grand nombre.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Qu'il s'agisse d'aménagement urbain, de mobilité ou d'énergie, la coopération des habitants permet d'inventer des réponses inédites. La participation citoyenne est un moyen pragmatique et enthousiaste de mieux fabriquer la cité de demain.
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
