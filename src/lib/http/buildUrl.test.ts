import buildUrl from "./buildUrl";

describe("buildUrl", () => {
  describe("when receives url: 'http://url.com/', path: '/some/path/' and params: 'foo: bar'", () => {
    it("should return 'http://url.com/some/path?foo=bar'", () => {
      const url = "http://url.com/";
      const options = {
        path: "/some/path",
        params: {
          foo: "bar",
        },
      };
      const expected = "http://url.com/some/path?foo=bar";

      const result = buildUrl(url, options);

      expect(result).toBe(expected);
    });
  });
});
