import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Feedback App',
  description: 'Built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
