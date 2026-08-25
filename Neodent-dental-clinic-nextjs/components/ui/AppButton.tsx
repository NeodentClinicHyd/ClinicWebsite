"use client";

import type { ReactNode } from "react";

export type AppButtonVariant = "dark" | "light" | "ghost" | "primary";

interface AppButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: AppButtonVariant;
  className?: string;
  type?: "button" | "submit";
}

function testId(children: ReactNode) {
  return String(children)
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();
}

export function AppButton({
  children,
  onClick,
  href,
  variant = "dark",
  className = "",
  type = "button",
}: AppButtonProps) {
  const classes = `button button-${variant} ${className}`;
  if (href)
    return (
      <a
        className={classes}
        href={href}
        data-testid={`link-${href.replace(/[^a-z0-9]+/gi, "-")}`}
      >
        {children}
      </a>
    );
  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      data-testid={`button-${testId(children)}`}
    >
      {children}
    </button>
  );
}
