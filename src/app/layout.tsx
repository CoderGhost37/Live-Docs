import { Metadata } from 'next';
import * as React from 'react';

import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';

import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/constant/config';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Provider from './Provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3371FF',
          fontSize: '16px',
        },
      }}
    >
      <html suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
