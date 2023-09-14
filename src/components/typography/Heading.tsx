import classnames from "@/lib/styles/classnames";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const variants: Record<HeadingLevel, string> = {
  h1: "text-5xl font-extrabold dark:text-white",
  h2: "text-4xl font-bold dark:text-white",
  h3: "text-3xl font-bold dark:text-white",
  h4: "text-2xl font-bold dark:text-white",
  h5: "text-xl font-bold dark:text-white",
  h6: "text-lg font-bold dark:text-white",
};

interface HeadingProps {
  children: string;
  variant: HeadingLevel;
  as?: HeadingLevel;
  className?: string;
}

export default function Heading({
  children,
  variant,
  as,
  className,
}: HeadingProps): JSX.Element {
  const Component = as ?? variant;

  return (
    <Component className={classnames(variants[variant], className)}>
      {children}
    </Component>
  );
}
