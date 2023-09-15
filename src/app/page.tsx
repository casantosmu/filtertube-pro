"use client";

import { useRouter } from "next/navigation";
import SearchInput from "@/components/forms/searchInput/SearchInput";
import Heading from "@/components/typography/Heading";

export default function RootPage(): JSX.Element {
  const router = useRouter();

  const handleOnSubmit = (filter: string): void => {
    router.push(`/search?filter=${filter}`);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-32 p-2 pb-80 text-center">
      <header>
        <Heading variant="h1">FilterTube PRO</Heading>
      </header>

      <main className="w-full">
        <SearchInput
          id="search"
          onSubmit={handleOnSubmit}
          placeholder="Search channel"
        />
      </main>
    </div>
  );
}
