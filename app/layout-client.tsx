"use client";

import ClientLayout from './client-layout';

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}