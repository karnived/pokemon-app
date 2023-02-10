import { PokemonSlotTypes, PokemonType } from "@/utils/types";

export const pokemonThemeColors: { [key in PokemonType]: string } = {
  [PokemonType.Bug]: 'bg-lime-400',
  [PokemonType.Dark]: 'bg-yellow-800',
  [PokemonType.Dragon]: 'bg-indigo-600',
  [PokemonType.Electric]: 'bg-yellow-400',
  [PokemonType.Fairy]: 'bg-pink-300',
  [PokemonType.Fighting]: 'bg-red-700',
  [PokemonType.Fire]: 'bg-red-500',
  [PokemonType.Flying]: 'bg-indigo-400',
  [PokemonType.Ghost]: 'bg-violet-500',
  [PokemonType.Grass]: 'bg-emerald-500',
  [PokemonType.Ground]: 'bg-amber-300',
  [PokemonType.Ice]: 'bg-cyan-200',
  [PokemonType.Normal]: 'bg-orange-300',
  [PokemonType.Poison]: 'bg-fuchsia-500',
  [PokemonType.Psychic]: 'bg-pink-400',
  [PokemonType.Rock]: 'bg-yellow-600',
  [PokemonType.Steel]: 'bg-indigo-300',
  [PokemonType.Water]: 'bg-blue-500',
}

export const getPokemonTheme = (data: Array<PokemonSlotTypes>) => {
  if(!data) return;

  const types = data?.map(item => item.type.name.toLowerCase());
  const mainType = types[0].charAt(0).toUpperCase() + types[0].slice(1); // capitalize
  return pokemonThemeColors[mainType as PokemonType];
}