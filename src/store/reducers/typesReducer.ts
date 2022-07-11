import { FIELD_TYPE } from "src/utils/enums";
import { generatedId } from "src/utils/helpers";
import { AppActions } from "..";
import {
  DO_ADD_FIELD_TO_TYPE,
  DO_ADD_TYPE_REQUEST,
  DO_REMOVE_TYPE,
  DO_UPDATE_FIELD_TYPE,
  DO_UPDATE_FORM_FIELD,
} from "../actions/typesAction";

export interface TypeField {
  value: string;
  type: FIELD_TYPE;
}

export interface TypeForm {
  [key: string]: string | TypeField[];
  id: string;
  object_type: string;
  object_title: string;
  fields: TypeField[];
}

const addNewType = (state: TypeForm[]) => {
  const updatedState = JSON.parse(JSON.stringify(state));
  updatedState.push({
    id: generatedId(8),
    object_title: "Title",
    object_type: "",
    fields: [{ value: "Title", type: FIELD_TYPE.SMALL_TEXT }],
  });
  return updatedState;
};

const addNewField = (state: TypeForm[], action: AppActions) => {
  const index: number = action.payload.index;
  const type: FIELD_TYPE = action.payload.type;
  const updatedState = JSON.parse(JSON.stringify(state));
  updatedState[index].fields.push({
    value: "",
    type: type || FIELD_TYPE.SMALL_TEXT,
  });
  return updatedState;
};

const updateFormField = (state: TypeForm[], action: AppActions) => {
  const updatedState = JSON.parse(JSON.stringify(state));
  const name = action.payload.name;
  const value = action.payload.value;
  const formIndex = action.payload.formIndex;
  const fieldIndex = action.payload.fieldIndex;
  if (fieldIndex !== undefined && fieldIndex !== null) {
    updatedState[formIndex].fields[fieldIndex].value = value;
  } else {
    updatedState[formIndex][name] = value;
  }
  return updatedState;
};

const updateFormFieldType = (state: TypeForm[], action: AppActions) => {
  const updatedState = JSON.parse(JSON.stringify(state));
  const value = action.payload.value;
  const formIndex = action.payload.formIndex;
  const fieldIndex = action.payload.fieldIndex;
  updatedState[formIndex].fields[fieldIndex].type = value;
  return updatedState;
};

const removeType = (state: TypeForm[], action: AppActions) => {
  let updatedState: TypeForm[] = JSON.parse(JSON.stringify(state));
  const index = action.payload.index;
  updatedState = updatedState.filter((_, i) => i !== index);
  return updatedState;
};

function typesReducer(state: TypeForm[] = [], action: AppActions) {
  switch (action.type) {
    case DO_ADD_TYPE_REQUEST:
      return addNewType(state);
    case DO_ADD_FIELD_TO_TYPE:
      return addNewField(state, action);
    case DO_UPDATE_FORM_FIELD:
      return updateFormField(state, action);
    case DO_UPDATE_FIELD_TYPE:
      return updateFormFieldType(state, action);
    case DO_REMOVE_TYPE:
      return removeType(state, action);
    default:
      return state;
  }
}

export default typesReducer;
