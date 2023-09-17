import classnames from "@/lib/styles/classnames";

type Variant = "default" | "light";

const variants: Record<Variant, string> = {
  default:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
  light:
    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
};

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "reset" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: Variant;
  className?: string;
}

export default function Button({
  children,
  type,
  onClick,
  variant,
  className,
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={classnames(variants[variant ?? "default"], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
