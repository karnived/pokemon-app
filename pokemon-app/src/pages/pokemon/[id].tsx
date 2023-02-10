import { useMemo } from "react";
import axios from "axios";
import Head from 'next/head'
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useSetRecoilState } from "recoil";
import { Pokemon } from "@/utils/types";
import { endpoints } from "@/utils/enpoints";
import { getPokemonTheme } from "@/utils/getPokemonTheme";
import PokemonDetail from "@/components/PokemonDetail";
import { selectedPokemonState } from "@/utils/store";
import { Routes } from "@/utils/routes";
import PokemonDetailHeader from "@/components/PokemonDetailHeader";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const data = await axios.get(`${endpoints.getPokemons}/${id}`).then(res => res.data);

  return {
    props: {
      data
    }
  }
}

type PokemonDetailPageProps = {
  data: Pokemon;
}

export default function PokemonDetailPage({ data }: PokemonDetailPageProps) {
  const router = useRouter();
  const theme = useMemo(() => getPokemonTheme(data.types), [data])
  const setPokemon = useSetRecoilState(selectedPokemonState);

  const handleOnClickCompare = () => {
    setPokemon(data);
    router.push(Routes.Home);
  }

  return (
      <>
        <Head>
          <title>Pokedex</title>
        </Head>

        <main className={classNames(styles.main, { [`${theme}`]: !!theme })}>
          <PokemonDetailHeader data={data} onClickCompare={handleOnClickCompare}/>
          <section className={styles.sectionDetail}>
            <PokemonDetail data={data}/>
          </section>
        </main>
      </>
  )
}

const styles = {
  main: 'min-h-[100vh] flex flex-col md:items-center overflow-hidden',
  sectionDetail: 'bg-white py-12 px-6 rounded-t-[32px] max-w-lg mx-auto w-full flex-1',
}
