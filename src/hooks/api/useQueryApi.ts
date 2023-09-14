import { useEffect, useReducer, useRef } from "react";
import Serializable from "@/types/Serializable";

type State<TResult, TError> =
  | {
      status: "idle";
      result: undefined;
      error: undefined;
    }
  | {
      status: "loading";
      result: TResult | undefined;
      error: TError | undefined;
    }
  | {
      status: "success";
      result: TResult;
      error: undefined;
    }
  | {
      status: "error";
      result: undefined;
      error: TError;
    };

type Action<TResult, TError> =
  | {
      type: "idle";
    }
  | {
      type: "loading";
    }
  | {
      type: "success";
      payload: TResult;
    }
  | {
      type: "error";
      payload: TError;
    };

const reducer = <TResult, TError>(
  state: State<TResult, TError>,
  action: Action<TResult, TError>,
): State<TResult, TError> => {
  switch (action.type) {
    case "idle":
      return {
        status: "idle",
        result: undefined,
        error: undefined,
      };
    case "loading":
      return {
        status: "loading",
        result: state.result,
        error: state.error,
      };
    case "success":
      return {
        status: "success",
        result: action.payload,
        error: undefined,
      };
    case "error":
      return {
        status: "error",
        result: undefined,
        error: action.payload,
      };
  }
};

const initialState = {
  status: "idle",
  result: undefined,
  error: undefined,
} as const;

interface Options<TResult, TError> {
  onSuccess?: (result: TResult) => void;
  onError?: (error: TError) => void;
}

export default function useQueryApi<
  TResult,
  TError,
  TArgs extends Serializable,
>(
  fetchFn: (args: TArgs) => Promise<TResult>,
  args: TArgs,
  options?: Options<TResult, TError>,
): State<TResult, TError> {
  const [state, dispatch] = useReducer(reducer<TResult, TError>, initialState);

  const serializedArgs = JSON.stringify(args);
  const optionsRef = useRef(options);

  useEffect(() => {
    let ignore = false;
    dispatch({ type: "loading" });
    fetchFn(JSON.parse(serializedArgs) as TArgs)
      .then((response) => {
        if (ignore) {
          return;
        }

        dispatch({
          type: "success",
          payload: response,
        });

        optionsRef.current?.onSuccess?.(response);
      })
      .catch((error: TError) => {
        if (ignore) {
          return;
        }

        dispatch({
          type: "error",
          payload: error,
        });

        optionsRef.current?.onError?.(error);
      });

    return () => {
      ignore = true;
    };
  }, [fetchFn, serializedArgs]);

  return state;
}
