import axios from "axios";
import { endpoints, GetPokemonsResponse } from "@/utils/enpoints";
import { Pokemon } from "@/utils/types";

export const getPokemonsList = async (requestUrl: string) => {
  const data = await axios.get(requestUrl).then(res => res.data) as GetPokemonsResponse;
  const urls = data.results.map(result => result.url);
  return { urls, count: data.count, next: data.next };
}

export const getPokemons = async (urls: Array<string>) => {
  const requests = urls.map(url => axios.get(url));
  return await axios.all(requests).then(response => response.map(res => res.data));
}

export const getFilteredPokemons = async (query: string) => {
  const requestUrl = `${endpoints.getPokemons}?limit=1500&offset=0`;
  const { urls } = await getPokemonsList(requestUrl);
  const pokemons = await getPokemons(urls) as Array<Pokemon>;

  return pokemons.filter(pokemon => pokemon.name.includes(query));
}