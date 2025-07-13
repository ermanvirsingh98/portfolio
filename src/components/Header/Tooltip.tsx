"use client";

import * as React from "react";

function SimpleTooltip({
  children,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return <div>{children}</div>;
}

export { SimpleTooltip };
