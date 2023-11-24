import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { cx } from '../utils';
import Header from '../components/partials/Header';
import Footer from '@/components/partials/Footer';
import { siteMetadata } from '@/utils/metadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-in'
});
const mr = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mr'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={cx(inter.variable, mr.variable, 'font-mr bg-light dark:bg-dark')}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
