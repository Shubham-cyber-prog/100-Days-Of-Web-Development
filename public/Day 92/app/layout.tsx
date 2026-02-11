import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hackathon 2026 - Registration',
  description: 'Register your team for Hackathon 2026. Build, innovate, and transform!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
