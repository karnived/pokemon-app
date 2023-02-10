import { Pokemon } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { endpoints, GetPokemonsResponse } from "@/utils/enpoints";
import PokemonGallery from "@/components/PokemonGallery";
import { GetServerSidePropsContext } from "next";

const REQUEST_URL = `${endpoints.getPokemons}?limit=1000&offset=0`;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await axios.get(REQUEST_URL).then(res => res.data);
  return {
    props: { data }
  }
}

type SearchPageProps = {
  data: GetPokemonsResponse;
}

export default function SearchPage({ data }: SearchPageProps) {
  const router = useRouter();
  const { query } = router.query;
  const [results, setResults] = useState<Array<Pokemon>>([]);

  const getAllPokemons = async (): Promise<Array<Pokemon>> => {
    const urls = data.results.map(results => results.url);
    // const response = await axios.get(REQUEST_URL).then(res => res.data) as GetPokemonsResponse;
    // const urls = response.results.map(result => result.url);
    // const requests = urls.map(url => axios.get(url));
    //
    // return await axios.all(requests).then(response => response.map(res => res.data))
  }

  useEffect(() => {
    if (!query) return;

    const fetch = async () => {
      const pokemons = await getAllPokemons();
      const filtered = pokemons.filter(pokemon => pokemon.name.includes(query as string));
      console.log(filtered)
      setResults(filtered);
    }

    fetch().catch(console.error);
  }, [])

  return <div>
    {/*<PokemonGallery data={} totalCount={} onLoadMore={}*/}
  </div>
}