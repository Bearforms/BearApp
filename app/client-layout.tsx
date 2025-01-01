"use client";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn(inter.className, "min-h-screen bg-background antialiased")}>
      {children}
      <Toaster />
    </div>
  );
}