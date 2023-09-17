import { z } from "zod";
import { Metadata } from "next";
import SearchList from "./SearchList";

const searchParamsSchema = z.object({
  filter: z.string(),
});

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const { filter } = searchParamsSchema.parse(searchParams);

  return {
    title: filter,
  };
}

export default function SearchPage({ searchParams }: Props): JSX.Element {
  const { filter } = searchParamsSchema.parse(searchParams);

  return (
    <>
      <header>
        <h1 className="sr-only">{filter}</h1>
      </header>

      <main className="mx-auto max-w-5xl p-2 sm:px-6">
        <SearchList />
      </main>
    </>
  );
}
