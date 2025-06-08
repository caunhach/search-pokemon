import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query GetPokemon($name: String) {
    pokemon(name: $name) {
      number
      name
      image
      maxHP
      classification
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        number
        name
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        attacks {
          fast {
            name
            type
            damage
          }
          special {
            name
            type
            damage
          }
        }
      }
    }
  }
`;
