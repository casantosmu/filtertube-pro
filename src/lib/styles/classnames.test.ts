/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import classnames from "./classnames";

describe("Classnames", () => {
  const testCases = [
    {
      inputs: [true && "foo", false && "bar"],
      expected: "foo",
    },
    {
      inputs: [false && "foo", true && "bar"],
      expected: "bar",
    },
    {
      inputs: [false],
      expected: "",
    },
    {
      inputs: ["foo", "bar"],
      expected: "foo bar",
    },
  ];

  testCases.forEach(({ inputs, expected }) => {
    it(`when receives '${inputs.toString()}' should return '${expected}'`, () => {
      const result = classnames(...inputs);

      expect(result).toBe(expected);
    });
  });
});
