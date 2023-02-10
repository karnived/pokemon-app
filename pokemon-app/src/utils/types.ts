export enum PokemonType {
  Bug = "Bug",
  Dark = "Dark",
  Dragon = "Dragon",
  Electric = "Electric",
  Fairy = "Fairy",
  Fighting = "Fighting",
  Fire = "Fire",
  Flying = "Flying",
  Ghost = "Ghost",
  Grass = "Grass",
  Ground = "Ground",
  Ice = "Ice",
  Normal = "Normal",
  Poison = "Poison",
  Psychic = "Psychic",
  Rock = "Rock",
  Steel = "Steel",
  Water = "Water",
}

export type PokemonInformation = {
  name: string;
  url: string;
}

export type PokemonAbility = {
  slot: number;
  ability: PokemonInformation;
  is_hidden: boolean;
}

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: PokemonInformation;
}

type BackSprite = {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
}

type FrontSprite = {
  front_default: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
}

export type Sprites = BackSprite & FrontSprite & {
  other?: {
    'official-artwork': FrontSprite;
  }
}

export type PokemonSlotTypes = {
  slot: number;
  type: PokemonInformation;
}

export type PokemonMove = {
  move: PokemonInformation;
}

export type Pokemon = {
  id: number;
  base_experience: number;
  num: string;
  name: string;
  img: string;
  height: number;
  weight: number;
  species: PokemonInformation;
  abilities: Array<PokemonAbility>;
  stats: Array<PokemonStat>;
  types: Array<PokemonSlotTypes>;
  moves: Array<PokemonMove>;
  sprites: Sprites;
}

export type Pokedex = {
  pokemons: Array<Pokemon>
}
