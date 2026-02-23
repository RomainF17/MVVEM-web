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
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "bg-blue-50/50"
  },
  {
    icon: TreePine,
    value: 85,
    suffix: "%",
    label: "Des français considèrent importante la proximité avec un espace vert",
    source: "",
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "bg-emerald-50/50"
  },
  {
    icon: Wind,
    value: 100,
    suffix: "g",
    label: "De particules fines piégées par un arbre en ville par an",
    source: "",
    gradient: "from-slate-600 to-slate-500",
    bgGradient: "bg-slate-50/50"
  },
  {
    icon: ThermometerSun,
    value: 5,
    prefix: "-3 à ",
    suffix: "°C",
    label: "Réduction de la température urbaine grâce aux arbres d'ombrage",
    source: "",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "bg-amber-50/50"
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
    <span className="tabular-nums tracking-tight">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gray-50/50">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16,185,129,0.15) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-bold text-sm tracking-wider uppercase mb-8 shadow-sm"
          >
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Un constat alarmant
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-display font-extrabold text-gray-900 leading-[1.1]">
            Pourquoi agir{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">maintenant</span>
            </span> ?
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`relative ${stat.bgGradient} rounded-[2rem] p-8 border border-white shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden h-full backdrop-blur-sm`}>

                {/* Decorative glowing blob */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${stat.gradient} opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                {/* Icon */}
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
                  >
                    <stat.icon className="w-8 h-8" />
                  </motion.div>
                </div>

                {/* Value */}
                <div className="mb-4 relative z-10">
                  <span className={`text-[3.5rem] leading-none font-display font-extrabold text-gray-900`}>
                    <AnimatedNumber
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      inView={isInView}
                    />
                  </span>
                </div>

                {/* Label */}
                <p className="text-gray-600 font-medium text-lg leading-snug relative z-10">
                  {stat.label}
                  {stat.source && (
                    <span className="text-gray-400 text-sm ml-1">({stat.source})</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom content card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-24"
        >
          <div className="relative bg-gray-900 rounded-[3rem] p-12 md:p-20 overflow-hidden group">
            {/* Ambient luxury lighting */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-500/20 via-teal-500/10 to-transparent rounded-full blur-[60px] opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-lime-500/20 via-emerald-500/10 to-transparent rounded-full blur-[60px] opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-12 text-center leading-tight tracking-tight"
              >
                La mobilisation citoyenne au cœur de la{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">transition</span>
              </motion.h3>

              <div className="grid md:grid-cols-2 gap-12 text-gray-300 leading-[1.8] text-xl font-medium">
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  D'un côté, les Français ont soif de démocratie et souhaitent être davantage associés aux décisions qui les concernent au quotidien. De l'autre, la lutte contre le réchauffement climatique implique de tels changements qu'il est impossible de réaliser cette transition sans l'adhésion du plus grand nombre.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
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
