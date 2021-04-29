import { AppState, Action, IPokemon } from "../../reducer";

// enum ActionType {
//   NEXT_PAGE = 'pagination/nextPage',
// };

const initialState: IPokemon[] = [];
// Reducer<typeof initialState, Action>
export default function pokemonsReducer(state = initialState, action: Action) {
  switch (action.type) {
    // case ActionType.NEXT_PAGE: {
    //   return state + 1;
    // }
    // case ActionType.SET_NEW_STATE: {
    //   return {
    //     ...state,
    //     ...action.payload
    //   }
    // }
    default:
      return state;
  }
};

// export const nextPage = () => ({ type: ActionType.NEXT_PAGE });

export const selectPokemons = (state: AppState) => state.pokemons;
