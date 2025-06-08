import { Suspense } from "react";
import PokemonHome from "./components/PokemonHome";

export default function Home() {
  return (
    <Suspense fallback={<p className="text-gray-500 text-center mt-6">Loading...</p>}>
      <PokemonHome />
    </Suspense>
  );
}