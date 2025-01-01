import { Metadata } from 'next';
import { RootLayoutClient } from './layout-client';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bearforms - Form Builder',
  description: 'Build and manage forms easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body suppressHydrationWarning>
        <Providers>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}