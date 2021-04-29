import { AppState, Action } from "../../reducer";

const initialState = 1;

export default function usersReducer(state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
};

export const selectUserId = (state: AppState) => state.userId;
