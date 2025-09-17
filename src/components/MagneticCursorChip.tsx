'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

type Vec = { x: number; y: number };

type Mode = 'idle' | 'magnetic' | 'attached';

type Props = {
  /** Diameter of the chip in px */
  size?: number;
  /** Margin from top-right corner in px (used when marginTop/marginRight omitted) */
  margin?: number;
  /** Margin from top edge in px */
  marginTop?: number;
  /** Margin from right edge in px */
  marginRight?: number;
  /** Margin from left edge in px when using sticky fallback */
  marginLeft?: number;
  /** Distance (px) where it starts getting pulled toward the cursor */
  magneticRadius?: number;
  /** Distance (px) at which it fully attaches to the cursor */
  attachRadius?: number;
  /** How strongly it leans toward the cursor before attaching (0..1) */
  magnetStrength?: number;
  /** Offset from the cursor while attached (px) */
  attachOffset?: Vec;
  /** Optional selector(s) to anchor the chip beside an element */
  anchorSelector?: string;
  /** Stick to the viewport left corner once the anchor scrolls out of view */
  stickToLeftWhenAnchorHidden?: boolean;
  /** Offset applied when anchoring to a selector */
  anchorOffset?: Vec;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** Optional: content inside the chip */
  children?: ReactNode;
};

const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.5;

const MagneticCursorChip = ({
  size = 48,
  margin = 24,
  marginTop,
  marginRight,
  marginLeft,
  magneticRadius = 140,
  attachRadius = 90,
  magnetStrength = 0.35,
  attachOffset = { x: 10, y: 10 },
  anchorSelector,
  stickToLeftWhenAnchorHidden = false,
  anchorOffset = { x: 16, y: 0 },
  stiffness = 300,
  damping = 28,
  children,
}: Props) => {
  const topMargin = marginTop ?? margin;
  const rightMargin = marginRight ?? margin;
  const leftMargin = marginLeft ?? margin;

  const selectors = useMemo(() => {
    if (!anchorSelector) return [] as string[];
    return anchorSelector
      .split(',')
      .map((sel) => sel.trim())
      .filter(Boolean);
  }, [anchorSelector]);

  const [anchor, setAnchor] = useState<Vec>({ x: 0, y: 0 }); // target position when idle
  const [target, setTarget] = useState<Vec>({ x: 0, y: 0 });
  const [mode, setMode] = useState<Mode>('idle');

  const anchorRef = useRef(anchor);
  const modeRef = useRef<Mode>(mode);
  const anchorElRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const ensureAnchorRef = useRef<number | null>(null);
  useEffect(() => {
    anchorRef.current = anchor;
  }, [anchor]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);


  // Springs for smooth motion (applied to center position)
  const x = useSpring(0, { stiffness, damping });
  const y = useSpring(0, { stiffness, damping });

  const half = size / 2;
  const xPosition = useTransform(x, (val) => val - half);
  const yPosition = useTransform(y, (val) => val - half);

  const findAnchorElement = useCallback(() => {
    if (!selectors.length || typeof document === 'undefined') {
      anchorElRef.current = null;
      return null;
    }

    if (anchorElRef.current && document.contains(anchorElRef.current)) {
      return anchorElRef.current;
    }

    for (const sel of selectors) {
      const el = document.querySelector<HTMLElement>(sel);
      if (el) {
        anchorElRef.current = el;
        return el;
      }
    }

    anchorElRef.current = null;
    return null;
  }, [selectors]);

  const computeAnchor = useCallback(() => {
    if (typeof window === 'undefined') return;

    let nextAnchor: Vec;
    const el = findAnchorElement();

    if (el) {
      const rect = el.getBoundingClientRect();
      const offset = anchorOffset;
      const anchorAboveViewport = rect.bottom <= 0;

      if (stickToLeftWhenAnchorHidden && anchorAboveViewport) {
        nextAnchor = {
          x: leftMargin + size / 2,
          y: topMargin + size / 2,
        };
      } else {
        nextAnchor = {
          x: rect.right + offset.x,
          y: rect.top + rect.height / 2 + offset.y,
        };
      }
    } else {
      const w = window.innerWidth;
      nextAnchor = {
        x: w - rightMargin - size / 2,
        y: topMargin + size / 2,
      };
    }

    setAnchor((prev) => {
      if (approxEqual(prev.x, nextAnchor.x) && approxEqual(prev.y, nextAnchor.y)) {
        return prev;
      }
      return nextAnchor;
    });

    if (modeRef.current === 'idle') {
      setTarget(nextAnchor);
    }
  }, [anchorOffset, findAnchorElement, leftMargin, rightMargin, size, stickToLeftWhenAnchorHidden, topMargin]);

  // Compute anchor on resize/scroll/selector changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scheduleCompute = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = window.requestAnimationFrame(() => {
        computeAnchor();
      });
    };

    scheduleCompute();
    window.addEventListener('resize', scheduleCompute);
    window.addEventListener('scroll', scheduleCompute, { passive: true });

    let resizeObserver: ResizeObserver | undefined;
    const observedEl = findAnchorElement();
    if (observedEl && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => scheduleCompute());
      resizeObserver.observe(observedEl);
    }

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', scheduleCompute);
      window.removeEventListener('scroll', scheduleCompute);
      resizeObserver?.disconnect();
    };
  }, [computeAnchor, findAnchorElement]);

  // When the selector target renders later, keep trying briefly so we latch onto it
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!selectors.length) return;

    let attempts = 0;
    const maxAttempts = 120;

    const tick = () => {
      attempts += 1;
      computeAnchor();

      if (anchorElRef.current || attempts >= maxAttempts) {
        if (ensureAnchorRef.current !== null) {
          cancelAnimationFrame(ensureAnchorRef.current);
          ensureAnchorRef.current = null;
        }
        return;
      }

      ensureAnchorRef.current = window.requestAnimationFrame(tick);
    };

    ensureAnchorRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (ensureAnchorRef.current !== null) {
        cancelAnimationFrame(ensureAnchorRef.current);
        ensureAnchorRef.current = null;
      }
    };
  }, [computeAnchor, selectors]);

  // Push springs toward target
  useEffect(() => {
    x.set(target.x);
    y.set(target.y);
  }, [target, x, y]);

  // Helpers
  const dist = (a: Vec, b: Vec) => Math.hypot(a.x - b.x, a.y - b.y);
  const lerpVec = (a: Vec, b: Vec, t: number): Vec => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  });

  // Mouse move logic
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const mouse: Vec = { x: e.clientX, y: e.clientY };
      const currentAnchor = anchorRef.current;
      const currentMode = modeRef.current;
      const dToAnchor = dist(mouse, currentAnchor);

      if (currentMode !== 'attached') {
        // “magnetic” pull when within magnetic radius
        if (dToAnchor <= magneticRadius) {
          if (currentMode !== 'magnetic') {
            setMode('magnetic');
          }
          const toward = lerpVec(currentAnchor, mouse, magnetStrength);
          setTarget(toward);

          // Attach if close enough
          if (dToAnchor <= attachRadius) {
            setMode('attached');
            setTarget({ x: mouse.x + attachOffset.x, y: mouse.y + attachOffset.y });
          }
        } else if (currentMode !== 'idle') {
          setMode('idle');
          setTarget(currentAnchor);
        }
      } else {
        setTarget({ x: mouse.x + attachOffset.x, y: mouse.y + attachOffset.y });
      }
    };

    const onLeave = () => {
      setMode('idle');
      setTarget(anchorRef.current);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMode('idle');
        setTarget(anchorRef.current);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('keydown', onKey);
    };
  }, [attachOffset.x, attachOffset.y, attachRadius, magnetStrength, magneticRadius]);

  // Initial anchor placement
  useEffect(() => {
    setTarget(anchor);
  }, [anchor]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        x: xPosition,
        y: yPosition,
        zIndex: 1000,
        borderRadius: 9999,
        pointerEvents: 'auto',
        scale: mode === 'attached' ? 1.08 : mode === 'magnetic' ? 1.03 : 1,
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        background: 'radial-gradient(circle at 30% 30%, #ffffff, #e5e7eb)',
        border: '1px solid rgba(0,0,0,0.06)',
        cursor: mode === 'attached' ? 'none' : 'pointer',
        userSelect: 'none',
      }}
      aria-label="Sticky magnetic cursor chip"
      title="Drag your cursor near me!"
      onClick={() => {
        if (mode === 'attached') {
          setMode('idle');
          setTarget(anchorRef.current);
        }
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          fontSize: 12,
          fontWeight: 600,
          color: '#111827',
        }}
      >
        {children ?? '❤️'}
      </div>
    </motion.div>
  );
};

export default MagneticCursorChip;
