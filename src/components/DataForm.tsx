import { useDispatch } from "react-redux";
import { doUpdateDataFields } from "src/store/actions/dataActions";
import { Data, DataFields } from "src/store/reducers/dataReducer";
import InputField from "src/ui-core/InputField";
import TextArea from "src/ui-core/TextArea";
import { FIELD_TYPE } from "src/utils/enums";

interface DataFormProps {
  data: Data;
  index: number;
}

const DataForm = ({ data, index }: DataFormProps) => {
  const dispatch = useDispatch();
  const fields = data?.fields || [];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldIndex: number
  ) => {
    const value = event.target.value;
    dispatch(doUpdateDataFields(data.typeId, index, fieldIndex, value));
  };

  const renderField = ({ type, label, value }: DataFields, i: number) => {
    switch (type) {
      case FIELD_TYPE.LONG_TEXT:
        return (
          <TextArea
            label={label}
            onChange={(event) => handleChange(event, i)}
            name={label}
            value={value}
          />
        );

      default:
        return (
          <InputField
            label={label}
            onChange={(event) => handleChange(event, i)}
            type={type}
            name={label}
            value={value}
          />
        );
    }
  };

  console.log(data);

  return (
    <div>
      <div>
        <p>{data?.object_type as string}</p>
      </div>
      <div className="d-flex flex-column">
        {fields.map((field, index) => {
          return (
            <div key={`field-${index + 1}`} className="d-flex">
              {renderField(field, index)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataForm;
