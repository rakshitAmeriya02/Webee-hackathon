import clsx from "clsx";
import { Form } from "react-bootstrap";

interface SelectProps {
  className?: string;
  label?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  value: string;
}

const Select = ({
  className,
  label,
  name,
  onChange,
  options,
  value,
}: SelectProps) => {
  return (
    <div className={clsx("d-flex flex-column mb-2 text-start", className)}>
      {label && <span className="mb-1">{label}</span>}
      <Form.Select name={name} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={`select-option-${index + 1}`} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default Select;
