import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

const Button = ({ children, variant = "primary", disabled }: ButtonProps) => {
  return <button type="button">{children}</button>;
};

export default Button;
