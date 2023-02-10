import { Pokemon } from "@/utils/types";

export enum Section {
  About = 'about',
  Stats = 'stats',
}

export const mapPokemonDetails = (data: Pokemon) => {
  return {
    [Section.About]: {
      height: data?.height,
      weight: data?.weight,
      abilities: data?.abilities?.map(value => value.ability.name),
    },
    [Section.Stats]: data?.stats?.map(value => ({ value: value.base_stat, name: value.stat.name })),
  }
}

export type SectionsProps = ReturnType<typeof mapPokemonDetails>;
export type SectionAbout = SectionsProps[Section.About];
export type SectionStats = SectionsProps[Section.Stats];