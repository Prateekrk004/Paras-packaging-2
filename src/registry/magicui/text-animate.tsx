import { motion, Variants } from "framer-motion";
import React from "react";

type AnimationType =
  | "fadeIn"
  | "blurIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

type AnimationBy = "character" | "word" | "line";

export interface TextAnimateProps {
  children: string;
  animation?: AnimationType;
  by?: AnimationBy;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  as?: React.ElementType;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(4px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  },
  slideUp: {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -15 },
    show: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 15 },
    show: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.2 },
    show: { opacity: 1, scale: 1 },
  },
};

export function TextAnimate({
  children,
  animation = "fadeIn",
  by = "word",
  delay = 0,
  duration,
  stagger,
  className = "",
  as: Component = "p",
}: TextAnimateProps) {
  const staggerDelay = stagger ?? (by === "character" ? 0.015 : by === "word" ? 0.06 : 0.15);

  if (by === "line") {
    const lines = children.split("\n");
    return (
      <Component className={className}>
        {lines.map((line, lineIdx) => (
          <motion.span
            key={lineIdx}
            initial="hidden"
            animate="show"
            variants={animationVariants[animation]}
            transition={{
              delay: delay + lineIdx * staggerDelay,
              duration: duration ?? 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="block"
          >
            {line}
          </motion.span>
        ))}
      </Component>
    );
  }

  if (by === "word") {
    const words = children.split(" ");
    return (
      <Component className={className}>
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            <motion.span
              initial="hidden"
              animate="show"
              variants={animationVariants[animation]}
              transition={{
                delay: delay + wordIdx * staggerDelay,
                duration: duration ?? 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
            {wordIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </Component>
    );
  }

  // default: by === "character"
  const words = children.split(" ");
  let flatCharIndex = 0;

  return (
    <Component className={className}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIdx) => {
            const index = flatCharIndex++;
            return (
              <motion.span
                key={charIdx}
                initial="hidden"
                animate="show"
                variants={animationVariants[animation]}
                transition={{
                  delay: delay + index * staggerDelay,
                  duration: duration ?? 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
          {wordIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Component>
  );
}
