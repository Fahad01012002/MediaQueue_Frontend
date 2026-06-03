"use client";

import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">

      {/* Icon */}
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-indigo-50 text-indigo-600">
        <AlertTriangle className="w-12 h-12" />
      </div>

      {/* 404 */}
      <h1 className="text-6xl font-extrabold mb-4 text-slate-900">
        404
      </h1>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="max-w-md mb-8 text-slate-600">
        We couldn't find the page you're looking for. It might have been removed, changed, or is temporarily unavailable.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>

    </div>
  );
}