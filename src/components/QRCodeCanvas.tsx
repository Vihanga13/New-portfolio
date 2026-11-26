"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRCodeSVGProps {
  value: string;
  size?: number;
}

export function QRCodeSVG({ value, size = 112 }: QRCodeSVGProps) {
  const [svgMarkup, setSvgMarkup] = useState<string>("");

  useEffect(() => {
    let active = true;
    QRCode.toString(value, {
      type: "svg",
      margin: 1,
      width: size,
      color: {
        dark: "#07080a",
        light: "#ffffff",
      },
    })
      .then((svg) => {
        if (active) setSvgMarkup(svg);
      })
      .catch(() => {
        // Fallback handled silently
      });
    return () => {
      active = false;
    };
  }, [value, size]);

  if (!svgMarkup) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center bg-neutral-100 font-mono-code text-[10px] text-neutral-700"
      >
        QR
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      aria-label={`QR code linking to ${value}`}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}

