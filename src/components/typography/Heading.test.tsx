import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Heading from "./Heading";

describe("Heading", () => {
  describe("when received 'Hello' as children and 'h1' as variant", () => {
    it("should render a heading with level 1 with the received text", () => {
      const text = "Hello";

      render(<Heading variant="h1">{text}</Heading>);

      const heading = screen.getByRole("heading", {
        name: text,
        level: 1,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("when received 'h1' as variant and 'h2' as", () => {
    it("should render a heading with level 2", () => {
      render(
        <Heading variant="h1" as="h2">
          foo
        </Heading>,
      );

      const heading = screen.getByRole("heading", {
        level: 2,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
