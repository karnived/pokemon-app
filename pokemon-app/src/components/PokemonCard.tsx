import { Pokemon } from "@/utils/types";
import Image from "next/image";
import { useMemo } from "react";
import classNames from "classnames";
import { isMobile } from 'react-device-detect';
import { getPokemonImage } from "@/utils/getPokemonImage";
import { getPokemonTheme } from "@/utils/getPokemonTheme";

type PokemonCardsProps = {
  data: Pokemon;
}

const POKEMON_IMAGE_SIZE_MOBILE = 80;
const POKEMON_IMAGE_SIZE_DESKTOP = 120;

const PokemonCard = ({ data }: PokemonCardsProps) => {
  const image = useMemo(() => getPokemonImage(data.sprites), [data]);
  const theme = useMemo(() => getPokemonTheme(data.types), [data])

  return (
      <div className={classNames(styles.cardContainer, { [`${theme}`]: !!theme })}>
        <div className={styles.contentContainer}>
          <h2 className={styles.name}>{data.name}</h2>
          <div className={styles.tagContainer}>
            {data.types?.map(({ type }) => (
                <span key={type.name} className={styles.tag}>{type.name}</span>
            ))}
          </div>
        </div>
        {image &&
            <Image src={image}
                   alt={`${data.name} image`}
                   width={isMobile ? POKEMON_IMAGE_SIZE_MOBILE : POKEMON_IMAGE_SIZE_DESKTOP}
                   height={isMobile ? POKEMON_IMAGE_SIZE_MOBILE : POKEMON_IMAGE_SIZE_DESKTOP}/>}
      </div>
  )
}

const styles = {
  cardContainer: 'py-4 px-4 text-white font-semibold capitalize flex rounded-[24px] justify-between',
  contentContainer: '',
  name: 'mb-2 text-md md:text-lg lg:text-2xl lg:mb-4',
  tagContainer: 'flex flex-col gap-2 lg:gap-3',
  tag: 'py-1 px-3 bg-white/25 rounded-full text-[10px] w-max lg:text-sm'
}

export default PokemonCard;