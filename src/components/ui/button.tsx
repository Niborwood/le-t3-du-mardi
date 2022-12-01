import type { ReactNode } from "react";
import classNames from "classnames";
import Link from "next/link";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  children,
  variant = "primary",
  disabled = false,
  size = "lg",
  onClick,
  className,
  href,
  type = "button",
}: ButtonProps) => {
  // Generating button
  const button = (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        "h-full w-full rounded-lg font-clash font-semibold uppercase transition-all",
        {
          "p-2 text-lg": size === "md",
          "p-6 text-4xl": size === "lg",
          "cursor-not-allowed opacity-50 hover:text-zinc-50": disabled,
          "bg-emerald-600 text-zinc-50 hover:bg-emerald-700 hover:text-zinc-50":
            variant === "primary",
          "border-4 border-zinc-900 bg-transparent text-zinc-900 hover:border-emerald-600 hover:text-emerald-600":
            variant !== "primary",
        },
        className
      )}
    >
      {children}
    </button>
  );

  return href ? (
    <Link className="block" href={href}>
      {button}
    </Link>
  ) : (
    button
  );
};

export default Button;
