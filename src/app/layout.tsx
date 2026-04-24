import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Toaster } from "sonner";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sai Chaitanya Parasana | Full Stack & AI Engineer",
  description: "Portfolio of Sai Chaitanya Parasana — Building real-time AI agents, RAG systems, and DevOps automation.",
  keywords: ["AI Engineer", "Full Stack Developer", "DevOps", "WebRTC", "RAG", "Next.js", "Sai Chaitanya"],
  authors: [{ name: "Sai Chaitanya Parasana" }],
  openGraph: {
    title: "Sai Chaitanya Parasana | Full Stack & AI Engineer",
    description: "Building real-time AI agents, RAG systems, and DevOps automation.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://saichaitanya.dev",
    siteName: "Sai's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sai Chaitanya Parasana Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Chaitanya Parasana | Full Stack & AI Engineer",
    description: "Building real-time AI agents, RAG systems, and DevOps automation.",
    creator: "@chaitanya_dev",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" expand={false} richColors theme="dark" />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
