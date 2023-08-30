import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("should render a heading with received text", () => {
    const text = "Hello";

    render(<Heading>{text}</Heading>);

    const heading = screen.getByRole("heading", {
      name: text,
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });
});
