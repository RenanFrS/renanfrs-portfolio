'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/lib/utils';

const STAGGER = 0.035;

interface TextRollProps {
  children: string;
  className?: string;
  center?: boolean;
}

export const TextRoll: React.FC<TextRollProps> = ({
  children,
  className,
  center = false,
}) => {
  const chars = children.split('');

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn('relative inline-block overflow-hidden align-bottom', className)}
      style={{ lineHeight: 0.85 }}
    >
      <span className="block">
        {chars.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (chars.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: '-100%' },
              }}
              transition={{ ease: 'easeInOut', delay }}
              className="inline-block whitespace-pre"
              key={`top-${i}`}
            >
              {l}
            </motion.span>
          );
        })}
      </span>
      <span className="absolute inset-0">
        {chars.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (chars.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: '100%' },
                hovered: { y: 0 },
              }}
              transition={{ ease: 'easeInOut', delay }}
              className="inline-block whitespace-pre"
              key={`bot-${i}`}
            >
              {l}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
};
