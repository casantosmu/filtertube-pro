import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Paragraph from "./Paragraph";

describe("Paragraph", () => {
  it("should render the received text", () => {
    const text = "Hello";

    render(<Paragraph>{text}</Paragraph>);

    const paragraph = screen.getByText(text);

    expect(paragraph).toBeInTheDocument();
  });
});
