import '@/styles/globals.css';
import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'YouTube Downloader',
  description: 'Download YouTube Videos',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://ytdl.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ytdl',
    description: 'Download YouTube Videos',
    url: 'https://ytdl.vercel.app',
    siteName: 'Ytdl',
    images: [
      {
        url: 'https://ytdl.vercel.app/favicon.ico',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Ytdl',
    description: 'Download Youtube Videos',
    creator: '@jtylpksz',
    images: ['https://ytdl.vercel.app/favicon.ico'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
