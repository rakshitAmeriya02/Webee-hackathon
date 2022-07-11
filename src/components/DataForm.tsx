import { useMemo } from "react";
import { CloseButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  doRemoveData,
  doUpdateDataFields,
} from "src/store/actions/dataActions";
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
  const postfix = useMemo(() => {
    const fields = data?.fields || [];
    const object_title = data?.object_title;
    const head = fields.find((item) => item.label === object_title);
    return head?.value || "";
  }, [data]);

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
            className="w-100"
            label={label}
            onChange={(event) => handleChange(event, i)}
            type={type}
            name={label}
            value={value}
          />
        );
    }
  };

  const handleRemoveValue = () => {
    dispatch(doRemoveData(index, data.typeId));
  };

  return (
    <div className="text-start">
      <div className="px-3 d-flex align-items-center py-2 name">
        <p className="mb-0">
          {(data?.object_type as string) + (postfix ? " - " : "") + postfix}
        </p>
        <CloseButton onClick={handleRemoveValue} />
      </div>
      <div className="d-flex flex-column px-3 py-2">
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
