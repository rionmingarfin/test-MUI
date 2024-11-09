/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts

export interface Ability {
  name: string;
  url: string;
}

export interface AbilityDetail {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Form {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

export interface Move {
  name: string;
  url: string;
}

export interface MoveDetail {
  move: Move;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: Record<string, any>;
  versions?: Record<string, any>;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PastType {
  generation: {
    name: string;
    url: string;
  };
  types: Type[];
}

export interface IPokemon {
  abilities: AbilityDetail[];
  base_experience: number;
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MoveDetail[];
  name: string;
  order: number;
  past_types: PastType[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface IStateDataPokemon {
  name: string;
  url: string;
  detail: IPokemon;
}
