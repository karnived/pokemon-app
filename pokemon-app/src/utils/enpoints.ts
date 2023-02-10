export type GetPokemonsResponse = {
  count: number;
  next?: string;
  previous?: string;
  results: Array<{
    name: string;
    url: string;
  }>
}

export const endpoints = {
  getPokemons: 'https://pokeapi.co/api/v2/pokemon'
}