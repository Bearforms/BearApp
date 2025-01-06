export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Form Not Found</h2>
        <p className="text-neutral-500">
          The form you&apos;re looking for doesn&apos;t exist or has been deleted.
        </p>
      </div>
    </div>
  );
}
