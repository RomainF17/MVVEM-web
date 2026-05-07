import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, createElement, type CSSProperties } from 'react';

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: APPLE_EASE },
  },
};

export type HeadlineSegment =
  | { text: string; className?: string }
  /** Inserts a flex line-break. Optional `breakpoint` matches Tailwind's responsive prefixes. */
  | { lineBreak: true; breakpoint?: 'sm' | 'md' | 'lg' };

export interface AnimatedHeadlineProps {
  segments: HeadlineSegment[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  /** "mount" plays on render, "inView" waits for the element to be visible */
  trigger?: 'mount' | 'inView';
  /** Wait before the first word appears (seconds). */
  delay?: number;
  style?: CSSProperties;
}

export function AnimatedHeadline({
  segments,
  className,
  as = 'h2',
  trigger = 'inView',
  delay = 0.1,
  style,
}: AnimatedHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const isVisible = trigger === 'mount' ? true : isInView;

  // Flatten segments into word-tokens or break-tokens
  type Token =
    | { kind: 'word'; text: string; className?: string }
    | { kind: 'break'; breakpoint?: 'sm' | 'md' | 'lg' };

  const tokens: Token[] = [];
  segments.forEach((seg) => {
    if ('lineBreak' in seg) {
      tokens.push({ kind: 'break', breakpoint: seg.breakpoint });
    } else {
      seg.text
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) =>
          tokens.push({ kind: 'word', text: word, className: seg.className })
        );
    }
  });

  const dynamicContainer: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: delay },
    },
  };

  const variants = delay === 0.1 ? containerVariants : dynamicContainer;

  const breakClass = (bp?: 'sm' | 'md' | 'lg') => {
    if (!bp) return 'block';
    // Hidden below breakpoint, block above. So break only on bp+.
    if (bp === 'sm') return 'hidden sm:block';
    if (bp === 'md') return 'hidden md:block';
    return 'hidden lg:block';
  };

  const inner = (
    <motion.span
      variants={variants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}
    >
      {tokens.map((tok, i) => {
        if (tok.kind === 'break') {
          return (
            <span
              key={i}
              className={breakClass(tok.breakpoint)}
              style={{ flexBasis: '100%', height: 0 }}
              aria-hidden
            />
          );
        }
        return (
          <span
            key={i}
            className="inline-block overflow-hidden pb-1 mr-[0.25em]"
            style={{ marginBottom: '-0.25em' }}
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block will-change-transform ${tok.className ?? ''}`}
            >
              {tok.text}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );

  return createElement(
    as,
    { ref, className, style },
    inner
  );
}
