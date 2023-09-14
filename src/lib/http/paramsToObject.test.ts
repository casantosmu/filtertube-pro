import paramsToObject from "./paramsToObject";

describe("paramsToObject", () => {
  describe("when receives URLSearchParams with 'foo1=bar&foo2=bar", () => {
    it("should return an object '{ foo1: bar, foo2: bar }'", () => {
      const searchParams = new URLSearchParams("foo1=bar&foo2=bar");
      const expectedObject = { foo1: "bar", foo2: "bar" };

      const result = paramsToObject(searchParams);

      expect(result).toStrictEqual(expectedObject);
    });
  });
});
