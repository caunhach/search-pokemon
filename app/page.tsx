import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apolloClient";
import PokemonHome from "./components/PokemonHome";

export default function Home() {
  return (
    <PokemonHome />
  )
}