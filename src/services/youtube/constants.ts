import { z } from "zod";

export const YOUTUBE_GOOGLE_API_BASE_URL = "https://youtube.googleapis.com";
export const YOUTUBE_GOOGLE_API_KEY = z
  .string()
  .parse(process.env.YOUTUBE_GOOGLE_API_KEY);
