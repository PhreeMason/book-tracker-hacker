import BookCover from '@/components/book-schedule/BookCover';
import { searchBooksApi } from '@/lib/data';
import { GoogleBook } from '@/types';

const BookSearch = async ({ query }: { query: string; }) => {
  const books = await searchBooksApi(query);
  return (
    <div className="p-2 flex flex-wrap items-center justify-center">
      {books.map((book: GoogleBook) => (
        <BookCover
          key={book.id}
          book={book.volumeInfo}
          className="w-[150px]"
          aspectRatio="square"
          width={150}
          height={150}
        />
      ))}
    </div>
  )
}

export default BookSearch