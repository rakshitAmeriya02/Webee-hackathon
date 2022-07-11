import React from "react";
import { Button } from "react-bootstrap";

interface CustomButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CustomButton = ({ className, children, onClick }: CustomButtonProps) => {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
