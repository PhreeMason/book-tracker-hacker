'use client';
import { format, addDays } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookContext } from '@/providers/BookContextProvider';
import { useContext } from "react";
import { Book } from "@/reducers/book-reducer";
import { Checkbox } from "@/components/ui/checkbox"

const CalculatePagesPerDay = (book: Book) => {
  const startDate = new Date(book.readingWindow.from).getTime();
  const endDate = new Date(book.readingWindow.to).getTime();
  const dateDiff = endDate - startDate;
  const days = Math.ceil(dateDiff / (1000 * 3600 * 24));
  const { currentPage, totalPages } = book;
  const pagesToRead = totalPages - currentPage
  return dateDiff === 0 ? pagesToRead : Math.ceil(pagesToRead / days);
}

const BookItem = ({ book, day }: { book: Book, day: Date }) => {
  const { dispatch } = useContext(BookContext);
  const checked = !!(book.lastDayRead && new Date(book.lastDayRead).getTime() >= day.getTime())
  const pagesForDay = CalculatePagesPerDay(book);
  const checkBoxDisabled = !!(book.lastDayRead && new Date(book.lastDayRead).getTime() > day.getTime())

  const handleCheckBoxChange = () => {
    if (book.lastDayRead) {
      dispatch({
        type: "UPDATE_BOOK",
        payload: {
          ...book,
          lastDayRead: null,
          currentPage: book.currentPage - pagesForDay
        }
      });
    } else {
      dispatch({
        type: "UPDATE_BOOK",
        payload: {
          ...book,
          lastDayRead: day.getTime(),
          currentPage: book.currentPage + pagesForDay
        }
      });
    }
  }

  return <div className="flex items-center">
    <Avatar className="h-9 w-9">
      <AvatarImage src="/avatars/01.png" alt="Avatar" />
      <AvatarFallback>OM</AvatarFallback>
    </Avatar>
    <div className="ml-4 space-y-1">
      <p className="text-sm font-medium leading-none">{book.title}</p>
      <p className="text-sm font-medium leading-none">{book.currentPage}</p>
      <p className="text-sm text-muted-foreground">
        {book.author}
      </p>

    </div>
    <div className="ml-auto font-medium">
      <div className="flex items-center space-x-2">
        <Checkbox checked={checked} id={book.id + '-completed'} disabled={checkBoxDisabled} onClick={handleCheckBoxChange} />
        <label
          htmlFor={book.id + '-completed'}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {pagesForDay} pages
        </label>
      </div>
    </div>
  </div>
}

const ReadingScheduleForOneDay = ({ books, day }: {
  books: Book[],
  day: Date
}) => {
  const dayString = format(day, "iii MMM d");
  return <>
    <CardDescription>
      {dayString}
    </CardDescription>
    <CardContent className="pl-2">
      <div className="space-y-8">
        {books.map((book) => (
          <BookItem key={book.id} book={book} day={day} />
        ))}
      </div>
    </CardContent>
  </>
}

const BookScheduleList = () => {
  const { state } = useContext(BookContext);
  const today = new Date();
  const nextFiveDays = [
    today,
    addDays(today, 1),
    addDays(today, 2),
    addDays(today, 3),
    addDays(today, 4),
  ];

  const nextFiveReadingSchedule = nextFiveDays.map((date) => {
    return state.books.filter((book) => {
      const startDate = new Date(book.readingWindow.from).getTime();
      const endDate = new Date(book.readingWindow.to).getTime();
      return date.getTime() >= startDate && date.getTime() <= endDate;
    });
  });
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Reading Schedule</CardTitle>
      </CardHeader>
      {nextFiveReadingSchedule.map((books, index) => <ReadingScheduleForOneDay
        key={nextFiveDays[index].getTime()}
        books={books}
        day={nextFiveDays[index]} />
      )}
    </Card>
  );
}

export default BookScheduleList;