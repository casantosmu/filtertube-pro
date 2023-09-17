"use client";

import Link from "next/link";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Card from "@/components/card/Card";
import CardContent from "@/components/card/CardContent";
import SearchItem from "@/core/entities/SearchItem";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import paramsToObject from "@/lib/http/paramsToObject";
import useQueryApi from "@/hooks/useQueryApi";
import searchApiService from "@/services/api/searchApiService";
import Button from "@/components/buttons/Button";

interface SearchItemsSkeletonProps {
  numberOfItems: number;
}

function SearchItemsSkeleton({
  numberOfItems,
}: SearchItemsSkeletonProps): JSX.Element {
  return (
    <>
      {[...Array(numberOfItems).keys()].map((searchItem: number) => {
        return (
          <li key={searchItem}>
            <Card className="sm:flex sm:flex-row sm:items-center">
              <div className="mt-4 sm:mt-0 sm:w-1/3 sm:py-4">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gray-300 shadow-lg dark:bg-gray-700">
                  <svg
                    className="h-10 w-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              </div>
              <CardContent className="sm:w-2/3">
                <div className="mb-5 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-3.5 h-2 max-w-[440px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </CardContent>
            </Card>
            <span className="sr-only">Loading...</span>
          </li>
        );
      })}
    </>
  );
}

interface SearchItemsProps {
  searchItems: SearchItem[];
}

function SearchItems({ searchItems }: SearchItemsProps): JSX.Element {
  return (
    <>
      {searchItems.map((searchItem) => {
        return (
          <li key={searchItem.id}>
            <Link href="/">
              <Card className="sm:flex sm:flex-row sm:items-center">
                <div className="mt-4 sm:mt-0 sm:w-1/3 sm:py-4">
                  {/*eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mx-auto h-32 w-32 rounded-full shadow-lg"
                    height={128}
                    width={128}
                    src={searchItem.thumbnails.sm.url}
                    alt={searchItem.title}
                  />
                </div>
                <CardContent className="sm:w-2/3">
                  <Heading
                    variant="h4"
                    as="h2"
                    className="mb-2 tracking-tight text-gray-900"
                  >
                    {searchItem.title}
                  </Heading>
                  <Paragraph>{searchItem.description}</Paragraph>
                </CardContent>
              </Card>
            </Link>
          </li>
        );
      })}
    </>
  );
}

const searchParamsSchema = z.object({
  filter: z.string(),
});

const MAX_RESULTS = 20;

export default function SearchList(): JSX.Element {
  const searchParams = useSearchParams();
  const { filter } = searchParamsSchema.parse(paramsToObject(searchParams));

  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>();

  const { status, result } = useQueryApi(
    searchApiService,
    {
      filter,
      maxResults: MAX_RESULTS,
      ...(nextPageToken && { pageToken: nextPageToken }),
    },
    {
      onSuccess(result) {
        setSearchItems((prev) => [...prev, ...result.data]);
      },
    },
  );

  if (status === "error") {
    return <Paragraph>Error</Paragraph>;
  }

  if (status === "idle" || status === "loading") {
    return (
      <ul>
        <SearchItems searchItems={searchItems} />
        <SearchItemsSkeleton numberOfItems={MAX_RESULTS} />
      </ul>
    );
  }

  return (
    <>
      <ul>
        <SearchItems searchItems={searchItems} />
      </ul>

      <div className="flex items-center justify-center pt-12">
        <Button
          variant="light"
          onClick={() => {
            setNextPageToken(result.metadata.nextPageToken);
          }}
        >
          Load more
        </Button>
      </div>
    </>
  );
}
