import { DataFields } from "../reducers/dataReducer";

export const DO_CREATE_NEW_ITEM = "DO_CREATE_NEW_ITEM";

export const DO_UPDATE_DATA_FIELDS = "DO_UPDATE_DATA_FIELDS";

export const doCreateNewItem = (
  typeId: string,
  object_title: string,
  object_type: string,
  fields: DataFields[]
) => ({
  type: DO_CREATE_NEW_ITEM,
  payload: {
    typeId,
    object_title,
    object_type,
    fields,
  },
});

export const doUpdateDataFields = (
  typeId: string,
  dIndex: number,
  fIndex: number,
  value: string | number
) => ({
  type: DO_UPDATE_DATA_FIELDS,
  payload: {
    typeId,
    dIndex,
    fIndex,
    value,
  },
});
