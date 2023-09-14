import classnames from "@/lib/styles/classnames";

interface ParagraphProps {
  children: string;
  className?: string;
}

export default function Paragraph({
  children,
  className,
}: ParagraphProps): JSX.Element {
  return (
    <p className={classnames("text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  );
}
