import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/store";
import {
  doAddNewField,
  doUpdateFieldType,
  doUpdateFormField,
} from "src/store/actions/typesAction";
import { TypeForm } from "src/store/reducers/typesReducer";
import CustomDropdown from "src/ui-core/Dropdown";
import InputField from "src/ui-core/InputField";
import Select from "src/ui-core/Select";
import { FIELD_TYPE_OPTIONS } from "src/utils/constants";

interface TypesFormProps {
  index: number;
}

const TypesForm = ({ index }: TypesFormProps) => {
  const dispatch = useDispatch();
  const formData = useSelector<AppState>(
    (state) => state.types[index]
  ) as TypeForm;
  const fields = formData?.fields || [];

  const handleAddField = (type: string) => {
    dispatch(doAddNewField(index, type));
  };

  const handleUpdateFieldType = (fieldIndex: number, type: string) => {
    dispatch(doUpdateFieldType(fieldIndex, index, type));
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
    fieldIndex?: number
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(doUpdateFormField(name, value, index, fieldIndex));
  };

  return (
    <div className="text-start">
      <div>
        <p>{formData.object_type}</p>
      </div>
      <div>
        <InputField
          value={formData.object_type}
          onChange={handleChange}
          name="object_type"
          label="Object Type"
        />
        <Select
          value={formData.object_title}
          label="Object Title"
          options={fields.map((field) => field.value.trim())}
          name="object_title"
          onChange={handleChange}
        />
      </div>
      <div>
        <span className="mb-2">Fields</span>
        {fields.map((field, i) => {
          const value = FIELD_TYPE_OPTIONS.find(
            (item) => item.value === field.type
          );
          return (
            <div key={`field-${i + 1}`} className="d-flex">
              <InputField
                onChange={(event) => handleChange(event, i)}
                type={"text"}
                value={field.value}
              />
              <CustomDropdown
                value={value}
                options={FIELD_TYPE_OPTIONS}
                onChange={({ value }) => handleUpdateFieldType(i, value)}
              />
            </div>
          );
        })}
      </div>
      <CustomDropdown
        title="Add Field"
        options={FIELD_TYPE_OPTIONS}
        onChange={({ value }) => handleAddField(value)}
      />
    </div>
  );
};

export default TypesForm;
