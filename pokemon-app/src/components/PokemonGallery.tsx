import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Pokemon } from "@/utils/types";
import PokemonCard from "@/components/PokemonCard";
import { Routes } from "@/utils/routes";
import { comparePokemonState, selectedPokemonState } from "@/utils/store";
import { useRouter } from "next/router";

type PokemonGalleryProps = {
  data: Array<Pokemon>;
  totalCount: number;
  onLoadMore: () => void;
}

const PokemonGallery = ({ data, onLoadMore, totalCount }: PokemonGalleryProps) => {
  const router = useRouter();
  const selectedPokemon = useRecoilValue(selectedPokemonState);
  const setComparePokemon = useSetRecoilState(comparePokemonState);

  const handleCardClick = (pokemon: Pokemon) => {
    if (!selectedPokemon) {
      return router.push(`${Routes.Detail}${pokemon.id}`)
    }

    if (selectedPokemon.id === pokemon.id) {
      console.error('You can compare a pokemon with itself!')
      return;
    }

    setComparePokemon(pokemon);
    return router.push(`${Routes.Compare}`)
  }


  return <InfiniteScroll
      className={styles.grid}
      dataLength={data.length}
      next={onLoadMore}
      hasMore={data.length < totalCount}
      scrollableTarget={'scrollable'}
      loader={<h4>Loading...</h4>}
      endMessage={<p className={styles.end}>You have reached the end!</p>}
  >
    {data.map((pokemon, index) => (
        <article key={index}
                 id={pokemon.id.toString()}
                 className={styles.item}
                 onClick={() => handleCardClick(pokemon)}>
          <PokemonCard data={pokemon}/>
        </article>
    ))}
  </InfiniteScroll>
}

const styles = {
  grid: 'grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4',
  item: 'cursor-pointer',
  end: 'flex justify-center w-full col-start-1 col-end-4'
}

export default PokemonGallery;