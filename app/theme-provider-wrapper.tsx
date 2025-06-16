// app/theme-provider-wrapper.tsx
"use client"; 
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // useEffect runs only on the client, after hydration
  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return <>{children}</>; 
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}