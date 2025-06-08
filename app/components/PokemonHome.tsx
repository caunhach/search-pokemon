'use client';

import SearchInput from './SearchInput';
import ResultView from './ResultView';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between p-6 gap-4 md:gap-0">

          <h1 className="text-3xl font-bold text-white text-center md:text-left w-full md:w-auto">
            PokéFinder
          </h1>

          <div className="w-full md:w-auto">
            <SearchInput />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <ResultView />
      </main>
    </div>
  );
}
