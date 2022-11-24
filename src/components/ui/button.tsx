import type { ReactNode } from "react";
import classNames from "classnames";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        "rounded-lg p-6 font-clash text-4xl font-semibold uppercase transition-all",
        {
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
