import { atom } from "recoil";
import { Pokemon } from "@/utils/types";

export const selectedPokemonState = atom<Pokemon | undefined>({
  key: 'selectedPokemon',
  default: undefined
});

export const comparePokemonState = atom<Pokemon | undefined>({
  key: 'comparePokemon',
  default: undefined
})