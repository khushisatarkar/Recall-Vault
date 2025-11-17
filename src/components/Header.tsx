import React from "react";

export default function Header() {
  return (
    <header className="max-w-4xl mx-auto py-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary">
          Memory Pro
        </h1>
        <div className="text-sm text-gray-600">
          Polished UX · Framer Motion · TS
        </div>
      </div>
    </header>
  );
}
