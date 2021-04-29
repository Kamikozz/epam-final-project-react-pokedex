import { AppState, Action } from "../../reducer";

enum ActionType {
  NEXT_PAGE = 'pagination/nextPage',
};

const initialState = 1;
// Reducer<typeof initialState, Action>
export default function pagesReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.NEXT_PAGE: {
      return state + 1;
    }
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

export const nextPage = () => ({ type: ActionType.NEXT_PAGE });

export const selectPage = (state: AppState) => state.page;
