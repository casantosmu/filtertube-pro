import { renderHook, waitFor } from "@testing-library/react";
import useQueryApi from "./useQueryApi";

describe("useQueryApi", () => {
  describe("with a resolving callback and provided arguments", () => {
    it("should transition from 'loading' to 'success' with the result and call callback with provided arguments", async () => {
      const resolvesTo = "foo";
      const args = { foo: "bar" };
      const callbackFn = jest.fn().mockResolvedValue(resolvesTo);

      const { result } = renderHook(() => useQueryApi(callbackFn, args));

      expect(callbackFn).toHaveBeenCalledWith(args);
      expect(callbackFn).toHaveBeenCalledTimes(1);
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
    it("should transition from 'loading' to 'error' with the error message and call callback with provided arguments", async () => {
      const rejectsTo = "Big error";
      const args = { foo: "bar" };
      const callbackFn = jest.fn().mockRejectedValueOnce(rejectsTo);

      const { result } = renderHook(() => useQueryApi(callbackFn, args));

      expect(callbackFn).toHaveBeenCalledWith(args);
      expect(callbackFn).toHaveBeenCalledTimes(1);
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
