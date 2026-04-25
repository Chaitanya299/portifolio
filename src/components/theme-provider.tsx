"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // To permanently resolve the "Encountered a script tag" error in React 19 / Next.js 16,
  // we disable the next-themes inline script injection and handle mounting manually.
  return (
    <NextThemesProvider {...props} enableSystem={false} disableTransitionOnChange>
      {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
    </NextThemesProvider>
  );
}
