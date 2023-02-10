import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/utils/types";
import { useMemo } from "react";
import { getPokemonImage } from "@/utils/getPokemonImage";

type PokemonDetailHeaderProps = {
  data: Pokemon;
  hasCompareButton?: boolean;
  hasBackButton?: boolean;
  onClickCompare?: () => void
}

const POKEMON_IMAGE_SIZE = 200;

const PokemonDetailHeader = ({
                               data,
                               onClickCompare,
                               hasCompareButton = true,
                               hasBackButton = true
                             }: PokemonDetailHeaderProps) => {
  const image = useMemo(() => getPokemonImage(data.sprites), [data]);

  return (
      <header className={styles.header}>
        {hasBackButton && (
            <button className={styles.backButton}>
              <Link href={'/'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill='currentColor'>
                  <path d="M0 0h36v36h-36z" fill="none"/>
                  <path d="M30 16.5h-18.26l8.38-8.38-2.12-2.12-12 12 12 12 2.12-2.12-8.38-8.38h18.26v-3z"/>
                </svg>
              </Link>
            </button>
        )}

        {hasCompareButton && (
            <button className={styles.compareButton} onClick={onClickCompare}>
              Compare
            </button>
        )}

        <div className={styles.headerDetail}>
          <h1 className={styles.name}>{data.name}</h1>
          <div className={styles.tags}>
            {data.types?.map(({ type }) => (
                <span key={type.name} className={styles.tag}>{type.name}</span>
            ))}
          </div>
          <span className={styles.id}>#{data.id?.toString().padStart(3, '0')}</span>
        </div>

        {image && (
            <div className={styles.imageContainer}>
              <Image src={image} alt={`${data.name} image`} width={POKEMON_IMAGE_SIZE}
                     height={POKEMON_IMAGE_SIZE}/>
            </div>
        )}
      </header>
  )
}


const styles = {
  backButton: 'text-white absolute top-[40px] left-6 md:left-[-5px]',
  header: 'capitalize relative px-6 pt-24 text-white max-w-lg w-full md:px-0',
  headerDetail: 'relative',
  name: 'text-4xl font-bold mb-4',
  tags: '',
  id: 'absolute right-0 top-[50%] font-bold md:top-[10px]',
  tag: 'py-2 px-5 bg-white/25 rounded-full text-[12px] font-medium w-max mr-2',
  imageContainer: 'relative bottom-[-40px] flex justify-center',
  compareButton: 'absolute bg-white border-yellow text-black rounded-md px-4 py-2 top-[40px] right-6 md:right-0',
}

export default PokemonDetailHeader;