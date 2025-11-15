"use client";
import { motion } from "framer-motion";
import { item } from "@/lib/motion";
import type { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

export function BentoCard({ children, onClick, className }: BentoCardProps) {
  return (
    <motion.button
      type="button"
      variants={item}
      onClick={onClick}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`relative bg-white rounded-2xl p-6 focus:outline-none h-full overflow-hidden ${className ?? ""}`}
    >
      <div className="absolute inset-0 rounded-2xl border border-dashed border-black/20 pointer-events-none" />
      <div className="flex h-full w-full flex-col items-start justify-start text-left relative z-10">
        {children}
      </div>
    </motion.button>
  );
}
