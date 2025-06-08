'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const clickSearch = () => {
    const trimmed = search.trim();
    if (!trimmed) return;

    const current = searchParams.get('name')?.trim() ?? '';
    if (trimmed === current) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('name', search.trim());
    const rawQs = params.toString().replace(/\+/g, ' ');
+   router.push(`/?${rawQs}`);
  };

  // sync input value with query param
  useEffect(() => {
    const name = searchParams.get('name');
    if (name) setSearch(name);
  }, [searchParams]);

  return (
    <div className="flex justify-center">
      <div className="flex items-stretch w-full max-w-lg">
        {/* Input with icon */}
        <div className="relative flex-grow">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full pl-12 pr-4 py-3 rounded-l-2xl border border-gray-300 focus:outline-none focus:border-blue-400 bg-white transition"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={clickSearch}
          className="px-6 py-3 rounded-r-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-shadow shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
}