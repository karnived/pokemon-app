import { Sprites } from "@/utils/types";

export const getPokemonImage = (sprites: Sprites) => {
  const fallback = sprites?.front_default;
  const artwork = sprites?.other?.["official-artwork"]?.front_default ?? fallback;
  return artwork;
}

