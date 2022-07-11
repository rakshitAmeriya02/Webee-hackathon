import React from "react";
import clsx from "clsx";

interface InputFieldProps {
  className?: string;
  label?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[] | undefined;
}

const InputField = ({
  className,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}: InputFieldProps) => {
  return (
    <div className={clsx("d-flex flex-column mb-2 text-start", className)}>
      {label && <span className="mb-1">{label}</span>}
      <input
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};

export default InputField;
