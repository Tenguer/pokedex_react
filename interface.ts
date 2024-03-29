export interface PokemonType {
  id: number,
  name: string,
  sprites: {
    front_default: string,
    other: {
      dream_world: {
        front_default: string,
      },
    },
  },
  types: {
    type: {
      name: string,
    },
  }[],
  height: number,
  weight: number,
}