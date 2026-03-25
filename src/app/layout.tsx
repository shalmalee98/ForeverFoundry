import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppProviders from "@/components/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "ForeverFoundry — AI Wedding Website Builder",
  description: "Create a beautiful wedding website in minutes. Live preview, themes, and AI-powered copy.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
