type Argument = string | boolean | null | undefined;

export default function classnames(...classNames: Argument[]): string {
  return classNames.reduce((result: string, className) => {
    if (typeof className !== "string" || !className.trim()) {
      return result;
    }

    if (result === "") {
      return className;
    }

    return `${result} ${className}`;
  }, "");
}
