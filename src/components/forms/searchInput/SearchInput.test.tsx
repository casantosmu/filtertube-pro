import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  describe("when user enters 'Some value' and clicks 'Search'", () => {
    it("should call onSubmit with 'Some value'", async () => {
      const user = userEvent.setup();
      const handleOnSearch = jest.fn();
      const placeholder = "placeholder";
      const userText = "Some value";

      render(
        <SearchInput
          id="id"
          onSubmit={handleOnSearch}
          placeholder={placeholder}
        />,
      );

      const input = screen.getByRole("searchbox", {
        name: placeholder,
      });
      await user.click(input);
      await user.keyboard(userText);
      const button = screen.getByRole("button", {
        name: "Search",
      });
      await user.click(button);

      expect(handleOnSearch).toHaveBeenCalledTimes(1);
      expect(handleOnSearch).toHaveBeenCalledWith(userText);
    });
  });
});
