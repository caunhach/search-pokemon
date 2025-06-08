'use client';

import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../graphql/queries';
import { useRouter, useSearchParams } from 'next/navigation';
import { typeColors } from '../utils/typeColors';
import Image from 'next/image';
import { Attack } from '../utils/typeAttacks';
import { Evolution } from '../utils/typeEvolutions';

export default function ResultView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name');

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name },
    skip: !name,
  });

  if (!name) return null;
  // if (loading) return <p className="mt-4 text-gray-500">Loading...</p>;
  // if (error || !data?.pokemon) return <p className="mt-4 text-red-500">Not found</p>;
  if (loading)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-gray-500 text-lg">Loading...</h1>
    </div>
  );

  if (error || !data?.pokemon)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-red-500 text-lg">Not found</h1>
    </div>
  );

  const p = data.pokemon;

  return (
    <div className="mt-6 p-4 md:p-6 border rounded-xl shadow-lg max-w-5xl mx-auto bg-white space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Image */}
        <div className="w-full md:w-64 h-64 mx-auto md:mx-0">
          <Image
            src={p.image || '/fallback.png'}
            alt={p.name}
            width={256}
            height={256}
            unoptimized
            className="w-full h-full object-contain rounded-xl border shadow"
          />
        </div>

        {/* Basic Info */}
        <div className="flex flex-col justify-between space-y-3 w-full">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              {p.name} #{p.number}
            </h2>
            <p className="text-sm text-gray-600 italic">{p.classification}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            <p><strong>Weight:</strong> {p.weight.minimum} - {p.weight.maximum}</p>
            <p><strong>Height:</strong> {p.height.minimum} - {p.height.maximum}</p>
            <p><strong>Max HP:</strong> {p.maxHP}</p>
            <p><strong>Max CP:</strong> {p.maxCP}</p>
            <p><strong>Flee Rate:</strong> {p.fleeRate}</p>
          </div>

          {/* Types / Resistant / Weaknesses */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2 text-sm">
            {/* Types */}
            <div>
              <p className="font-semibold text-gray-700">Types:</p>
              <div className="flex gap-1 flex-wrap">
                {p.types.map((type: string) => {
                  const color = typeColors[type] || { bg: 'bg-gray-100', text: 'text-gray-700' };
                  return (
                    <span key={type} className={`${color.bg} ${color.text} px-2 py-0.5 rounded text-xs`}>
                      {type}
                    </span>
                  );
                })}
              </div>
            </div>
              
            {/* Resistant */}
            <div>
              <p className="font-semibold text-gray-700">Resistant:</p>
              <div className="flex gap-1 flex-wrap">
                {p.resistant.map((res: string) => {
                  const { bg, text } = typeColors[res] ?? typeColors.default;
                  return (
                    <span key={res} className={`${bg} ${text} px-2 py-0.5 rounded text-xs`}>
                      {res}
                    </span>
                  );
                })}
              </div>
            </div>
              
            {/* Weaknesses */}
            <div>
              <p className="font-semibold text-gray-700">Weaknesses:</p>
              <div className="flex gap-1 flex-wrap">
                {p.weaknesses.map((w: string) => {
                  const { bg, text } = typeColors[w] ?? typeColors.default;
                  return (
                    <span key={w} className={`${bg} ${text} px-2 py-0.5 rounded text-xs`}>
                      {w}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attacks */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Attacks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium">Fast</h4>
            <ul className="list-disc pl-5">
              {p.attacks.fast.map((atk: Attack) => (
                <li key={atk.name}>
                  {atk.name} ({atk.type} - {atk.damage})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Special</h4>
            <ul className="list-disc pl-5">
              {p.attacks.special.map((atk: Attack) => (
                <li key={atk.name}>
                  {atk.name} ({atk.type} - {atk.damage})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
            
      {/* Evolutions */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Evolutions</h3>
        {p.evolutions?.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {p.evolutions.map((evo: Evolution) => (
              <button
                key={evo.name}
                onClick={() => router.push(`/?name=${evo.name}`)}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm font-medium shadow-sm"
              >
                {evo.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">This Pokémon has no evolutions.</p>
        )}
      </div>
    </div>
  );
}