import { z } from "zod";
import {
  YOUTUBE_GOOGLE_API_BASE_URL,
  YOUTUBE_GOOGLE_API_KEY,
} from "./constants";
import SearchItem from "@/core/entities/SearchItem";
import fetcher from "@/lib/http/fetcher";

const responseSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  prevPageToken: z.string().optional(),
  nextPageToken: z.string().optional(),
  regionCode: z.string(),
  pageInfo: z.object({ totalResults: z.number(), resultsPerPage: z.number() }),
  items: z.array(
    z.object({
      kind: z.string(),
      etag: z.string(),
      id: z.object({ kind: z.string(), channelId: z.string() }),
      snippet: z.object({
        publishedAt: z.string(),
        channelId: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnails: z.object({
          default: z.object({ url: z.string() }),
          medium: z.object({ url: z.string() }),
          high: z.object({ url: z.string() }),
        }),
        channelTitle: z.string(),
        liveBroadcastContent: z.string(),
        publishTime: z.string(),
      }),
    }),
  ),
});

interface Result {
  metadata: {
    prevPageToken: string | undefined;
    nextPageToken: string | undefined;
    total: number;
    perPage: number;
  };
  data: SearchItem[];
}

interface Props {
  filter: string;
  maxResults: number;
  pageToken?: string;
}

export default async function searchYTService({
  filter,
  maxResults,
  pageToken,
}: Props): Promise<Result> {
  const response = await fetcher.get(YOUTUBE_GOOGLE_API_BASE_URL, {
    path: "/youtube/v3/search",
    params: {
      part: "snippet",
      maxResults,
      order: "relevance",
      q: filter,
      type: "channel",
      key: YOUTUBE_GOOGLE_API_KEY,
      ...(pageToken && { pageToken }),
    },
  });

  const data = responseSchema.parse(response);

  return {
    metadata: {
      prevPageToken: data.nextPageToken,
      nextPageToken: data.nextPageToken,
      total: data.pageInfo.totalResults,
      perPage: data.pageInfo.resultsPerPage,
    },
    data: data.items.map((item) => ({
      id: item.id.channelId,
      title: item.snippet.channelTitle,
      description: item.snippet.description,
      thumbnails: {
        sm: {
          url: item.snippet.thumbnails.default.url,
        },
        md: {
          url: item.snippet.thumbnails.medium.url,
        },
        lg: {
          url: item.snippet.thumbnails.high.url,
        },
      },
    })),
  };
}
