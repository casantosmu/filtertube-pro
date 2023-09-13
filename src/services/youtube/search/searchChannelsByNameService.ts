import { z } from "zod";
import {
  YOUTUBE_GOOGLE_API_BASE_URL,
  YOUTUBE_GOOGLE_API_KEY,
} from "@/services/youtube/constants";
import fetcher from "@/lib/http/fetcher";

const searchChannelsByName200Schema = z.object({
  kind: z.string(),
  etag: z.string(),
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

type SearchChannelsByName200 = z.infer<typeof searchChannelsByName200Schema>;

export interface SearchChannelsByNameServiceResult {
  metadata: {
    nextPageToken: SearchChannelsByName200["nextPageToken"];
  };
  data: SearchChannelsByName200["items"];
}

export default async function searchChannelsByNameService(
  channelName: string,
): Promise<SearchChannelsByNameServiceResult> {
  const response = await fetcher.get(YOUTUBE_GOOGLE_API_BASE_URL, {
    path: "/youtube/v3/search",
    params: {
      part: "snippet",
      type: "channel",
      q: channelName,
      key: YOUTUBE_GOOGLE_API_KEY,
    },
  });

  const data = searchChannelsByName200Schema.parse(response);

  return {
    metadata: {
      nextPageToken: data.nextPageToken,
    },
    data: data.items,
  };
}
