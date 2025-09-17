"use client";

import React from "react";

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
