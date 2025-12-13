"use client";

import React, { useEffect, useState } from "react";
import { Star, Sparkles, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type SuccessIndicatorProps = {
  percentage: number;
  animate?: boolean;
  className?: string;
  showIcon?: boolean;
  ariaLabel?: string;
};

/**
 * Color thresholds for success rate visualization:
 * - Low (<60%): Warm coral/pink tones
 * - Medium (60-80%): Sunny yellow/amber tones
 * - High (>80%): Vibrant green/teal tones
 *
 * All colors chosen for kid-friendly appeal and WCAG AA contrast compliance.
 */
function getSuccessColor(percentage: number): {
  bg: string;
  text: string;
  icon: React.ReactNode;
} {
  if (percentage >= 80) {
    return {
      bg: "bg-gradient-to-r from-emerald-400 to-teal-500",
      text: "text-emerald-900",
      icon: <Trophy className="h-5 w-5" aria-hidden="true" />,
    };
  } else if (percentage >= 60) {
    return {
      bg: "bg-gradient-to-r from-yellow-400 to-amber-500",
      text: "text-amber-900",
      icon: <Sparkles className="h-5 w-5" aria-hidden="true" />,
    };
  } else {
    return {
      bg: "bg-gradient-to-r from-rose-400 to-pink-500",
      text: "text-rose-900",
      icon: <Star className="h-5 w-5" aria-hidden="true" />,
    };
  }
}

export default function SuccessIndicator({
  percentage,
  animate = true,
  className,
  showIcon = true,
  ariaLabel,
}: SuccessIndicatorProps) {
  const [width, setWidth] = useState(animate ? 0 : percentage);
  const { bg, text, icon } = getSuccessColor(percentage);

  useEffect(() => {
    if (animate) {
      // Delay animation start slightly for better visual effect
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [animate, percentage]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel || `Success rate: ${percentage}%`}
    >
      {showIcon ? (
        <>
          {/* Progress fill background */}
          <div
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-out",
              bg,
            )}
            style={{ width: `${width}%` }}
          />

          {/* Content overlay */}
          <div className="relative flex items-center justify-between gap-2 px-4 py-3 h-full">
            <span className={cn("text-lg font-semibold", text)}>
              {percentage}%
            </span>
            <span className={cn("shrink-0", text)}>{icon}</span>
          </div>
        </>
      ) : (
        /* Simple progress bar without icon */
        <div
          className={cn("h-full transition-all duration-1000 ease-out", bg)}
          style={{ width: `${width}%` }}
        />
      )}
    </div>
  );
}
