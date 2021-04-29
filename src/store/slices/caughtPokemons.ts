import { AppState } from "../../reducer";

export const selectCaughtPokemons = (state: AppState) => state.caughtPokemons;
export const selectCaughtPokemonsIds = (state: AppState) => state.caughtPokemonsIds;
