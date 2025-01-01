'use client';

export function ThumbnailSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 animate-pulse">
      <div className="w-8 h-8 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}