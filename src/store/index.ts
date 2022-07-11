import { combineReducers, createStore, Action } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import typesReducer, { TypesState } from "./reducers/typesReducer";

export interface AppState {
  types: TypesState;
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers<AppState, Action>({
  types: typesReducer,
});

const persisted = persistReducer(persistConfig, rootReducer);
export const store = createStore(persisted);
