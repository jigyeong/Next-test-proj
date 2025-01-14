import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

type Props = {
  searchParams: Promise<{ [key: string]: string }>
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  return {
    title: `${params.q} : 한입북스 검색`,
    description: `${params.q} 검색 결과입니다`,
    openGraph: {
      title: `${params.q} : 한입북스 검색`,
      description: `${params.q} 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const param = (await searchParams).q || "";
  return (
    <Suspense
      key={param || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={param || ""} />
    </Suspense>
  );
}
