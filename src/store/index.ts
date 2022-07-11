import { combineReducers, createStore, Action } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataReducer, { DataState } from "./reducers/dataReducer";
import typesReducer, { TypeForm } from "./reducers/typesReducer";

export interface AppState {
  types: TypeForm[];
  data: DataState;
}

export interface AppActions extends Action {
  payload: any;
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers<AppState, AppActions>({
  types: typesReducer,
  data: dataReducer,
});

const persisted = persistReducer(persistConfig, rootReducer);
export const store = createStore(persisted);
