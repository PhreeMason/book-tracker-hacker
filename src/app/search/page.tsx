import Search from '@/components/ui/search';
import React from 'react'
import BookSearch from "@/components/book-schedule/BookSearch";

async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query;
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-50 py-6 sm:py-12">
      <Search />
      {query && <BookSearch query={query} />}
    </div>
  )
}

export default SearchPage
