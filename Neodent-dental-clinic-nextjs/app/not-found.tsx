import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";

// Next serves this page with a 404 HTTP status automatically, but an
// explicit noindex avoids any ambiguity for crawlers that inspect the
// response body/meta tags rather than relying on status code alone.
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex mb-4 gap-2">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    </div>
  );
}
