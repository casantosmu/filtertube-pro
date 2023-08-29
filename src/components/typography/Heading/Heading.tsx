type HeadingProps = {
  children: string;
};

export const Heading = ({ children }: HeadingProps): JSX.Element => {
  return (
    <h1 className="text-5xl font-extrabold dark:text-white">{children}</h1>
  );
};
