import type { ReactNode } from "react";
import classNames from "classnames";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
};

const Button = ({
  children,
  variant = "primary",
  disabled = false,
  size = "lg",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "rounded-lg font-clash font-semibold uppercase transition-all",
        {
          "p-2 text-lg": size === "md",
          "p-6 text-4xl": size === "lg",
          "cursor-not-allowed opacity-50 hover:text-zinc-50": disabled,
          "bg-emerald-600 text-zinc-50 hover:bg-emerald-700 hover:text-zinc-50":
            variant === "primary",
          "border-4 border-zinc-900 bg-transparent text-zinc-900 hover:border-emerald-600 hover:text-emerald-600":
            variant !== "primary",
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
