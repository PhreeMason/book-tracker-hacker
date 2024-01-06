import { BookContextProvider } from "@/providers/BookContextProvider";
import BookScheduleForm from "./BookScheduleForm";
import BookScheduleList from "./BookScheduleList";
import BookSearch from "./BookSearch";

const BookScheduleContainer = () => <BookContextProvider >
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    <BookScheduleList />
    <BookScheduleForm />
  </div>
</BookContextProvider>

export default BookScheduleContainer;
