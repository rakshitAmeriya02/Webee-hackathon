import { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

export interface DropdownOption {
  label: string;
  value: string;
  order: number;
}

interface CustomDropdownProps {
  className?: string;
  onChange?: (value: DropdownOption) => void;
  options: DropdownOption[];
  title?: string;
  value?: DropdownOption;
}

const CustomDropdown = ({
  className,
  options,
  onChange,
  title,
  value,
}: CustomDropdownProps) => {
  options.sort((a, b) => a.order - b.order);
  const [selectedOption, setSelectedOption] = useState(() =>
    value ? value : options[0]
  );

  const handleChange = (value: DropdownOption) => {
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <DropdownButton
      className={className}
      variant="secondary"
      title={title || selectedOption.label}
      onChange={(e) => console.log(e.target)}
    >
      {options.map((option, i) => (
        <Dropdown.Item
          key={`option-${i + 1}`}
          eventKey={option.value}
          onClick={() => handleChange(options[i])}
        >
          {option.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CustomDropdown;
