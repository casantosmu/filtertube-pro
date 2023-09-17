import classnames from "@/lib/styles/classnames";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps): JSX.Element {
  return (
    <div
      className={classnames(
        "rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800",
        className,
      )}
    >
      {children}
    </div>
  );
}
