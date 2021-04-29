import { AppState, ActionType } from "../../reducer";

export const nextPage = () => ({ type: ActionType.NEXT_PAGE });

export const selectPage = (state: AppState) => state.page;
