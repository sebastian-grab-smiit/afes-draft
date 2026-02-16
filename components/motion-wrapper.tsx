"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

/**
 * Enterprise Animation Principles:
 * - Motion must explain structure, not attract attention
 * - Animations should be almost invisible
 * - Fast, subtle transitions (200ms)
 * - Prefer opacity-only transitions when possible
 * - Full accessibility support for prefers-reduced-motion
 */

// Subtle fade-in for content reveal - minimal movement (4px)
// Use sparingly when vertical context is important
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
};

// Preferred animation for Enterprise context - opacity only
// Use this as default for most content reveals
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        duration: 0.2, // Fast, subtle transitions (200ms)
        delay, 
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        duration: 0.2, // Fast, subtle transitions (200ms)
        delay, 
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.03, // Minimal stagger for sequential content
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{
        duration: 0.2, // Fast, subtle transitions (200ms)
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollReveal - Enterprise-grade scroll animation
 *
 * Features:
 * - Uses Intersection Observer for performance
 * - Triggers when element is 10% in viewport
 * - Subtle animation: opacity 0→1, y: 8px→0
 * - Duration: 300ms (slightly slower for scroll reveals)
 * - Optional delay for staggered effects (max 100ms)
 * - Respects prefers-reduced-motion (opacity only)
 *
 * Usage:
 * <ScrollReveal>
 *   <h2>Section Title</h2>
 * </ScrollReveal>
 *
 * <ScrollReveal delay={50}>
 *   <div>Content with slight delay</div>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // If reduced motion is preferred, show immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 300ms ease-out ${delay}ms, transform 300ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
