export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Outfit, Caveat, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { Suspense } from "react";
import { Loading } from "@/app/board/[boardId]/_component/loading";

// Open Runde substitute per brand spec — geometric, confident, works well
// at tight negative tracking for display sizes.
const displayFont = Outfit({
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const signatureFont = Caveat({
  variable: "--font-signature",
  weight: ["600"],  
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Texo",
  description: "A real-time collaborative whiteboard for teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${signatureFont.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            <ConvexClientProvider>
              <ModalProvider />
              <Toaster />
              {children}
            </ConvexClientProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
