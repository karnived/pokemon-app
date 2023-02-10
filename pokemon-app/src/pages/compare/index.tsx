import { useRecoilValue } from "recoil";
import { comparePokemonState, selectedPokemonState } from "@/utils/store";
import PokemonDetailHeader from "@/components/PokemonDetailHeader";
import PokemonDetail from "@/components/PokemonDetail";
import { getPokemonTheme } from "@/utils/getPokemonTheme";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { Routes } from "@/utils/routes";

export default function ComparePage() {
  const router = useRouter();
  const selectedPokemon = useRecoilValue(selectedPokemonState);
  const comparePokemon = useRecoilValue(comparePokemonState);

  if (!selectedPokemon || !comparePokemon) return router.push(Routes.Home);

  return <main className={styles.main}>
    <button className={styles.backButton}>
      <Link href={'/'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill='currentColor'>
          <path d="M0 0h36v36h-36z" fill="none"/>
          <path d="M30 16.5h-18.26l8.38-8.38-2.12-2.12-12 12 12 12 2.12-2.12-8.38-8.38h18.26v-3z"/>
        </svg>
      </Link>
    </button>

    <ul className={styles.list}>
      {[selectedPokemon, comparePokemon].map(pokemon => {
        const theme = getPokemonTheme(pokemon.types);

        return (
            <li key={pokemon.id} className={classNames(styles.item, { [`${theme}`]: !!theme })}>
              <PokemonDetailHeader data={pokemon} hasCompareButton={false} hasBackButton={false}/>
              <div className={styles.detail}>
                <PokemonDetail data={pokemon}/>
              </div>
            </li>
        )
      })}
    </ul>
  </main>
}

const styles = {
  main: 'relative',
  list: 'flex flex-col md:flex-row w-full min-h-[100vh]',
  item: 'flex flex-col md:items-center flex-1',
  detail: 'bg-white py-12 px-6 rounded-t-[32px] max-w-lg mx-auto w-full flex-1',
  backButton: 'absolute text-white top-[2rem] left-[2rem]',
}