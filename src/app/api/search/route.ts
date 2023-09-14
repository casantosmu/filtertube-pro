import { z } from "zod";
import routeHandler from "@/lib/routeHandlers/routeHandler";
import paramsToObject from "@/lib/http/paramsToObject";
import searchYTService from "@/services/youtube/searchYTService";

const searchParamsSchema = z
  .object({
    filter: z.string(),
    maxResults: z.coerce.number(),
    pageToken: z.string().optional(),
  })
  .strict();

// eslint-disable-next-line import/prefer-default-export
export const GET = (request: Request): unknown =>
  routeHandler(async () => {
    const { searchParams } = new URL(request.url);
    const params = searchParamsSchema.parse(paramsToObject(searchParams));

    return await searchYTService(params);
  });
