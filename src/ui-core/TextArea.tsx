import React from "react";
import clsx from "clsx";

interface TextAreaProps {
  className?: string;
  label?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string;
}

const TextArea = ({
  className,
  label,
  name,
  onChange,
  placeholder,
  value,
}: TextAreaProps) => {
  return (
    <div className={clsx("d-flex flex-column mb-2 text-start", className)}>
      {label && <span className="mb-1">{label}</span>}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
