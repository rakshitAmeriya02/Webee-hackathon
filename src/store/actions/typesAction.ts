export const DO_ADD_TYPE_REQUEST = "DO_ADD_TYPE_REQUEST";

export const DO_ADD_FIELD_TO_TYPE = "DO_ADD_FIELD_TO_TYPE";

export const DO_UPDATE_FORM_FIELD = "DO_UPDATE_FORM_FIELD";

export const DO_UPDATE_FIELD_TYPE = "DO_UPDATE_FIELD_TYPE";

export const DO_REMOVE_TYPE = "DO_REMOVE_TYPE";

export const doAddNewType = () => ({
  type: DO_ADD_TYPE_REQUEST,
});

export const doAddNewField = (index: number, type: string) => ({
  type: DO_ADD_FIELD_TO_TYPE,
  payload: { index, type },
});

export const doUpdateFormField = (
  name: string,
  value: string | number,
  formIndex: number,
  typeId: string,
  fieldIndex?: number
) => ({
  type: DO_UPDATE_FORM_FIELD,
  payload: {
    name,
    value,
    formIndex,
    fieldIndex,
    typeId,
  },
});

export const doUpdateFieldType = (
  fieldIndex: number,
  formIndex: number,
  value: string,
  typeId: string
) => ({
  type: DO_UPDATE_FIELD_TYPE,
  payload: {
    fieldIndex,
    formIndex,
    value,
    typeId,
  },
});

export const doRemoveType = (index: number, typeId: string) => ({
  type: DO_REMOVE_TYPE,
  payload: {
    index,
    typeId,
  },
});
