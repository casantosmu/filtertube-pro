import classnames from "./classnames";

describe("Classnames", () => {
  const testCases = [
    {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      inputs: [true && "foo", false && "bar"],
      expected: "foo",
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      inputs: [false && "foo", true && "bar"],
      expected: "bar",
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
      inputs: [true && "foo"],
      expected: "foo",
    },
  ];

  testCases.forEach(({ inputs, expected }) => {
    it(`when receives '${inputs.toString()}' should return '${expected}'`, () => {
      const result = classnames(...inputs);

      expect(result).toBe(expected);
    });
  });
});
