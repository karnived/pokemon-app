import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'
import { useRecoilState, useRecoilValue } from "recoil";
import { endpoints } from "@/utils/enpoints";
import PokemonGallery from "@/components/PokemonGallery";
import { Pokemon } from "@/utils/types";
import Search from "@/components/Search";
import { getFilteredPokemons, getPokemons, getPokemonsList } from "@/utils/getPokemons";
import { selectedPokemonState } from "@/utils/store";
import PokemonCard from "@/components/PokemonCard";

const REQUEST_LIMIT = 30;
const INITIAL_REQUEST_URL = `${endpoints.getPokemons}?limit=${REQUEST_LIMIT}&offset=${0}`

export default function HomePage() {
  const router = useRouter();
  const [selectedPokemon, setSelectedPokemon] = useRecoilState(selectedPokemonState);

  const [nextPageUrl, setNextPageUrl] = useState<string>();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<Array<Pokemon>>([]);
  const [offset, setOffset] = useState<number>(Number(router.query.offset) || 0);
  const [limit] = useState<number>(Number(router.query.limit) || REQUEST_LIMIT);

  const fetchUrls = useCallback(async (url: string) => {
    const { urls, next, count } = await getPokemonsList(url);
    setTotalCount(count);
    setNextPageUrl(next);
    setOffset(prev => prev + REQUEST_LIMIT);
    return urls;
  }, [])

  const update = useCallback(async (urls: Array<string>) => {
    return getPokemons(urls)
        .then(pokemons => setList(previous => Array.from([...previous, ...pokemons])));
  }, [])

  const handleOnLoad = async () => {
    if (!nextPageUrl || isLoading) return;
    const urls = await fetchUrls(nextPageUrl);
    await update(urls);
  }

  const handleOnSearch = async (query: string) => {
    setIsLoading(true);

    router.replace({
      query: {
        ...router.query,
        q: query
      }
    });

    const filteredPokemons = await getFilteredPokemons(query);
    setList(filteredPokemons);
    setIsLoading(false);
  }

  const handleOnClean = () => {
    setList([]);
    setOffset(0);

    fetchUrls(INITIAL_REQUEST_URL).then(async urls => await update(urls));
  }

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        limit,
        offset
      }
    })
  }, [limit, offset])

  useEffect(() => {
    const initialRequestUrl = `${endpoints.getPokemons}?limit=${limit}&offset=${offset}`;
    fetchUrls(initialRequestUrl)
        .then(async urls => await update(urls))
        .finally(() => setIsLoading(false));
  }, [])

  return (
      <>
        <Head>
          <title>Pokedex!</title>
          <link rel="icon" href="/pokemon-favicon.ico"/>
        </Head>

        <main className={styles.main}>
          <div className={styles.container}>
            <header className={styles.header}>
              <h1 className={styles.title}>Pokedex</h1>
              <Search onSearch={handleOnSearch} onClean={handleOnClean}/>
            </header>

            <div className={styles.galleryContainer} id='scrollable'>
              {isLoading && <span>Loading...</span>}
              {!isLoading && <PokemonGallery data={list} totalCount={totalCount} onLoadMore={handleOnLoad}/>}
            </div>
          </div>

          {selectedPokemon && (
              <aside className={styles.popup}>
                <button className={styles.deselect} onClick={() => setSelectedPokemon()}>
                  Deselect
                </button>
                <div className={styles.popupCardContainer}>
                  <PokemonCard data={selectedPokemon}/>
                </div>
              </aside>
          )}
        </main>
      </>
  )
}

const styles = {
  main: 'bg-white h-[100vh]',
  container: 'px-4 md:px-8 pt-12 lg:pt-20 max-w-5xl m-auto h-full flex flex-col',
  header: 'mb-6 md:mb-10 flex flex-col md:flex-row md:items-center md:justify-between',
  title: 'text-5xl font-bold text-gray-700 mb-4 md:mb-0',
  galleryContainer: 'flex-1 pb-[4rem] max-h-[75vh] overflow-y-scroll',
  popup: 'absolute bottom-6 right-4 max-w-[310px]',
  popupCardContainer: 'shadow-lg shadow-emerald-500/50 rounded-[24px]',
  deselect: 'absolute top-[-3rem] right-0 bg-gray-700 text-white py-2 px-4 rounded-lg'
}
