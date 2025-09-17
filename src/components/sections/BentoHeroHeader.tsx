"use client";
import MagneticCursorChip from "@/components/MagneticCursorChip";

export function BentoHeroHeader() {
  return (
    <div className="flex items-center mb-8">
      <h1 id="hero-name" className="text-4xl sm:text-6xl font-semibold tracking-tight mt-0">
        Sarayu Ramdas
      </h1>
      <MagneticCursorChip
        size={36}
        anchorSelector="#hero-name"
        anchorOffset={{ x: 12, y: 0 }}
        magneticRadius={120}
        attachRadius={80}
        attachOffset={{ x: 8, y: 6 }}
        stickToLeftWhenAnchorHidden
      >

      </MagneticCursorChip>
    </div>
  );
}
