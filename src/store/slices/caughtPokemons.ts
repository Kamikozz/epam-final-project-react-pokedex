import { AppState, Action, ICaughtPokemons, ICaughtPokemon } from "../../reducer";

enum ActionType {
  ADD_CAUGHT_POKEMONS = 'caughtPokemons/addCaughtPokemons',
  ADD_CAUGHT_POKEMON = 'caughtPokemons/addCaughtPokemon',
};

const initialState: ICaughtPokemons = {
  items: [],
  uniqueIds: null,
};

export default function caughtPokemonsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.ADD_CAUGHT_POKEMONS:
      return {
        ...state,
        items: [...state.items, ...action.payload],
      };
    case ActionType.ADD_CAUGHT_POKEMON: {
      const caughtPokemon: ICaughtPokemon = action.payload;
      const uniqueIds = new Set();
      if (state.uniqueIds) {
        state.uniqueIds.forEach((item) => uniqueIds.add(item));
      }
      uniqueIds.add(caughtPokemon.pokemonId);
      return {
        items: [...state.items, caughtPokemon],
        uniqueIds,
      };
    }
    default:
      return state;
  }
};

export const addCaughtPokemons = (caughtPokemons: ICaughtPokemon[]) => ({
  type: ActionType.ADD_CAUGHT_POKEMONS,
  payload: caughtPokemons,
});
export const addCaughtPokemon = (caughtPokemon: ICaughtPokemon) => ({
  type: ActionType.ADD_CAUGHT_POKEMON,
  payload: caughtPokemon,
});

// export const setCaughtPokemons = (caughtPokemons: CaughtPokemonsState) => ({
//   type: ActionType.SET_CAUGHT_POKEMONS,
//   payload: caughtPokemons,
// });

export const selectCaughtPokemons = (state: AppState) => state.caughtPokemons;
export const selectCaughtPokemonsItems = (state: AppState) => state.caughtPokemons.items;
export const selectCaughtPokemonsIds = (state: AppState) => state.caughtPokemons.uniqueIds;
