import { z } from "zod";

// eslint-disable-next-line import/prefer-default-export
export const API_BASE_URL = z
  .string()
  .url()
  .parse(process.env.NEXT_PUBLIC_API_BASE_URL);
