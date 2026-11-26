"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/#*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}

export function ScrambleText({
  text,
  className = "",
  triggerOnHover = true,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    setDisplay(text);
    if (typeof window !== "undefined") {
      reducedMotionRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text]);

  const scramble = useCallback(() => {
    if (reducedMotionRef.current) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    let iteration = 0;
    const step = () => {
      const next = text
        .split("")
        .map((char, idx) => {
          if (char === " ") return " ";
          if (idx < iteration) return text[idx];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(next);
      iteration += 0.55;
      if (iteration < text.length) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(text);
      }
    };
    frameRef.current = requestAnimationFrame(step);
  }, [text]);

  return (
    <span
      onMouseEnter={triggerOnHover ? scramble : undefined}
      onFocus={triggerOnHover ? scramble : undefined}
      className={className}
    >
      {display}
    </span>
  );
}

