import { motion, useInView } from 'framer-motion';
import { TreePine, Wind, ThermometerSun, Users } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const stats = [
  {
    icon: Users,
    value: 90,
    suffix: "%",
    label: "Des français dépendent des villes",
    source: "Insee"
  },
  {
    icon: TreePine,
    value: 85,
    suffix: "%",
    label: "Des français considèrent importante la proximité avec un espace vert",
    source: ""
  },
  {
    icon: Wind,
    value: 100,
    suffix: "g",
    label: "De particules fines piégées par un arbre en ville par an",
    source: ""
  },
  {
    icon: ThermometerSun,
    value: 5,
    prefix: "-3 à ",
    suffix: "°C",
    label: "Réduction de la température urbaine grâce aux arbres d'ombrage",
    source: ""
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
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">
            Un constat alarmant
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-neutral-900 leading-[1.1] tracking-tight">
            Pourquoi agir <span className="text-emerald-600">maintenant</span> ?
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-neutral-200 rounded-2xl p-7 h-full"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 mb-8">
                <stat.icon className="w-5 h-5" strokeWidth={2} />
              </div>

              {/* Value */}
              <div className="mb-3">
                <span className="text-5xl font-display font-semibold text-neutral-900 tracking-tight">
                  <AnimatedNumber
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                </span>
              </div>

              {/* Label */}
              <p className="text-neutral-600 text-base leading-snug">
                {stat.label}
                {stat.source && (
                  <span className="text-neutral-400 text-sm ml-1">({stat.source})</span>
                )}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
