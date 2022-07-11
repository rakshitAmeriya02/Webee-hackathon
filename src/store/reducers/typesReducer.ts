import { Action } from "redux";

interface ObjectFields {
  [key: string]: string | number;
}

interface ObjectType {
  object_type: string;
  object_title: string;
  fields: ObjectFields[];
}

export type TypesState = ObjectType[];

const initialState: TypesState = [];

function typesReducer(state: TypesState = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default typesReducer;
