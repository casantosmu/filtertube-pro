import { API_BASE_URL } from "./constants";
import SearchItem from "@/core/entities/SearchItem";
import fetcher from "@/lib/http/fetcher";

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

export default function searchApiService({
  filter,
  maxResults,
  pageToken,
}: Props): Promise<Result> {
  return fetcher.get(API_BASE_URL, {
    path: "/api/search",
    params: {
      filter,
      maxResults,
      ...(pageToken && { pageToken }),
    },
  });
}
