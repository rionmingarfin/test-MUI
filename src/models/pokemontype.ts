/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Ability {
  name: string;
  url: string;
}

export interface AbilityInfo {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Form {
  name: string;
  url: string;
}

export interface Version {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Version;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  // Add more specific fields based on the actual structure of sprites object if needed
}

export interface Stat {
  // Add more specific fields based on the actual structure of stat object if needed
}

export interface Type {
  name: string;
  url: string;
}

export interface TypeInfo {
  slot: number;
  type: Type;
}

export interface TStatePokemonType {
  type: string;
  name: string;
  url: string;
  detail: IPokemonType;
}

export interface TStateType {
  name: string;
  url: string;
}

export interface IPokemonType {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: AbilityInfo[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: any[]; // Specify type based on actual data if needed
  location_area_encounters: string;
  moves: any[]; // Specify type based on actual data if needed
  species: Species;
  sprites: Record<string, any>;
  stats: Stat[];
  types: TypeInfo[];
}
