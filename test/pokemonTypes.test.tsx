/**
 * @jest-environment jsdom
 */
import { render, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_POKEMON } from '../app/graphql/queries';
import ResultView from '../app/components/ResultView';
import { useSearchParams } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useSearchParams: jest.fn(),
}));

const mockSearchParams = (name: string) => {
  (useSearchParams as jest.Mock).mockReturnValue({
    get: (key: string) => (key === 'name' ? name : null),
    toString: () => `name=${name}`,
  });
};

// -----------------------------
// 🧪 Mock Responses
// -----------------------------
const pokemonMocks = [
  {
    request: { query: GET_POKEMON, variables: { name: 'Bulbasaur' } },
    result: {
      data: {
        pokemon: {
          name: 'Bulbasaur',
          number: '001',
          image: '',
          classification: 'Seed Pokémon',
          maxHP: 100,
          maxCP: 100,
          fleeRate: 0.1,
          weight: { minimum: '', maximum: '' },
          height: { minimum: '', maximum: '' },
          types: ['Grass', 'Poison'],
          resistant: [],
          weaknesses: [],
          attacks: { fast: [], special: [] },
          evolutions: [],
        },
      },
    },
  },
  {
    request: { query: GET_POKEMON, variables: { name: 'Charmander' } },
    result: {
      data: {
        pokemon: {
          name: 'Charmander',
          number: '004',
          image: '',
          classification: 'Lizard Pokémon',
          maxHP: 100,
          maxCP: 100,
          fleeRate: 0.1,
          weight: { minimum: '', maximum: '' },
          height: { minimum: '', maximum: '' },
          types: ['Fire'],
          resistant: [],
          weaknesses: [],
          attacks: { fast: [], special: [] },
          evolutions: [],
        },
      },
    },
  },
  {
    request: { query: GET_POKEMON, variables: { name: 'Squirtle' } },
    result: {
      data: {
        pokemon: {
          name: 'Squirtle',
          number: '007',
          image: '',
          classification: 'Tiny Turtle Pokémon',
          maxHP: 100,
          maxCP: 100,
          fleeRate: 0.1,
          weight: { minimum: '', maximum: '' },
          height: { minimum: '', maximum: '' },
          types: ['Water'],
          resistant: [],
          weaknesses: [],
          attacks: { fast: [], special: [] },
          evolutions: [],
        },
      },
    },
  },
];

// -----------------------------
// ✅ Test Suite
// -----------------------------
describe('Pokémon type correctness', () => {
  it.each([
    ['Bulbasaur', 'Grass'],
    ['Charmander', 'Fire'],
    ['Squirtle', 'Water'],
  ])('should show correct type for %s', async (pokemonName, expectedType) => {
    mockSearchParams(pokemonName);

    render(
      <MockedProvider mocks={pokemonMocks} addTypename={false}>
        <ResultView />
      </MockedProvider>
    );

    await waitFor(() => {
      const typeBadge = screen.getByText(expectedType);
      expect(typeBadge).toBeInTheDocument();
    });
  });
});
