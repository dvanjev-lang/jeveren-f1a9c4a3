import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const APP_NAME = "FlowDesk";
const APP_DESCRIPTION =
  "Your unified command center. Sync Gmail, Slack & Calendar, get AI-powered email prioritization, daily briefings, and smart meeting scheduling — all in one dashboard.";
const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://flowdesk.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} — Unified Inbox for Busy Leaders`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "unified inbox",
    "email prioritization",
    "AI briefings",
    "Gmail integration",
    "Slack integration",
    "calendar sync",
    "productivity dashboard",
    "startup founder tools",
    "manager dashboard",
    "Claude AI",
  ],
  authors: [{ name: "FlowDesk", url: APP_URL }],
  creator: "FlowDesk",
  publisher: "FlowDesk",
  category: "Productivity",
  classification: "Business/Productivity",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — Unified Inbox for Busy Leaders`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} — Your unified command center`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@flowdeskapp",
    creator: "@flowdeskapp",
    title: `${APP_NAME} — Unified Inbox for Busy Leaders`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} — Your unified command center`,
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: APP_URL,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },

  other: {
    "msapplication-TileColor": "#6366f1",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f12" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`
          min-h-screen bg-background font-sans antialiased
          selection:bg-indigo-500/20 selection:text-indigo-300
        `}
      >
        <div
          className="relative flex min-h-screen flex-col"
          id="app-root"
        >
          {children}
        </div>

        <Toaster
          position="bottom-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
            classNames: {
              toast:
                "group font-sans text-sm border border-white/10 bg-zinc-900/95 backdrop-blur-xl text-zinc-100 shadow-2xl shadow-black/40",
              title: "font-semibold text-zinc-100",
              description: "text-zinc-400",
              actionButton:
                "bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3 py-1.5 rounded-md transition-colors",
              cancelButton:
                "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-medium text-xs px-3 py-1.5 rounded-md transition-colors",
              closeButton:
                "border border-white/10 bg-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors",
              success:
                "!border-emerald-500/20 !bg-emerald-950/90 [&>[data-icon]]:text-emerald-400",
              error:
                "!border-red-500/20 !bg-red-950/90 [&>[data-icon]]:text-red-400",
              warning:
                "!border-amber-500/20 !bg-amber-950/90 [&>[data-icon]]:text-amber-400",
              info: "!border-indigo-500/20 !bg-indigo-950/90 [&>[data-icon]]:text-indigo-400",
            },
          }}
        />

        {process.env.NODE_ENV === "development" && (
          <div
            className="
              fixed bottom-2 left-2 z-[9999] rounded-md
              bg-zinc-900/80 px-2 py-1 font-mono text-[10px]
              text-zinc-500 backdrop-blur-sm border border-white/5
              pointer-events-none select-none
            "
          >
            <span className="sm:hidden">xs</span>
            <span className="hidden sm:inline md:hidden">sm</span>
            <span className="hidden md:inline lg:hidden">md</span>
            <span className="hidden lg:inline xl:hidden">lg</span>
            <span className="hidden xl:inline 2xl:hidden">xl</span>
            <span className="hidden 2xl:inline">2xl</span>
          </div>
        )}
      </body>
    </html>
  );
}