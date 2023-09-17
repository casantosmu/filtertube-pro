import { renderHook, waitFor } from "@testing-library/react";
import useQueryApi from "./useQueryApi";

describe("useQueryApi", () => {
  describe("with a resolving callback and provided arguments", () => {
    it("should call callback with provided arguments and transition from 'loading' to success' with the resolved value", async () => {
      const resolvesTo = "foo";
      const args = { foo: "bar" };
      const fetchFn = jest.fn().mockResolvedValueOnce(resolvesTo);

      const { result } = renderHook(() => useQueryApi(fetchFn, args));

      expect(fetchFn).toHaveBeenCalledWith(args);
      expect(fetchFn).toHaveBeenCalledTimes(1);
      expect(result.current).toStrictEqual({
        status: "loading",
        result: undefined,
        error: undefined,
      });
      await waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          result: resolvesTo,
          error: undefined,
        });
      });
    });
  });

  describe("with a rejecting callback and provided arguments", () => {
    it("call callback with provided arguments and should transition from 'loading' to 'error' with the rejected error", async () => {
      const rejectsTo = "Big error";
      const args = { foo: "bar" };
      const fetchFn = jest.fn().mockRejectedValueOnce(rejectsTo);

      const { result } = renderHook(() => useQueryApi(fetchFn, args));

      expect(fetchFn).toHaveBeenCalledWith(args);
      expect(fetchFn).toHaveBeenCalledTimes(1);
      expect(result.current).toStrictEqual({
        status: "loading",
        result: undefined,
        error: undefined,
      });
      await waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "error",
          result: undefined,
          error: rejectsTo,
        });
      });
    });
  });
});
