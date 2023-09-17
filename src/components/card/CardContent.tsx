import classnames from "@/lib/styles/classnames";

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardContent({
  children,
  className,
}: CardContentProps): JSX.Element {
  return <div className={classnames("p-6", className)}>{children}</div>;
}
