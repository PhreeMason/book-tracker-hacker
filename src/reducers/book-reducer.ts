export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'COMPLETE' | 'IN_PROGRESS' | 'NOT_STARTED';
  currentPage: number;
  totalPages: number;
  notes: string[];
  readingWindow: {
    from: number;
    to: number;
  };
  actualCompletionDate: null | number;
  lastDayRead?: null | number;
}

export interface BookActionType {
  type: 'ADD_BOOK' | 'UPDATE_BOOK' | 'DELETE_BOOK';
  payload: Book;
}

const books: Book[] = [
  {
    id: "1",
    title: "Book 1",
    author: "Author 1",
    status: "COMPLETE",
    currentPage: 0,
    totalPages: 100,
    notes: [],
    readingWindow: {  from: 1699842074099, to: 1702875600000 },
    actualCompletionDate: null,
  },
  {
    id: "2",
    title: "Book 2",
    author: "Author 2",
    status: "IN_PROGRESS",
    currentPage: 50,
    totalPages: 200,
    notes: ["Note 1", "Note 2"],
    readingWindow: {  from: 1699333200000, to: 1700802000000 },
    actualCompletionDate: null,
  },
  {
    id: "3",
    title: "Book 3",
    author: "Author 3",
    status: "NOT_STARTED",
    currentPage: 0,
    totalPages: 150,
    notes: [],
    readingWindow: { from: 1698379200000, to: 1703739600000 },
    actualCompletionDate: null,
  },
  {
    id: "4",
    title: "Book 4",
    author: "Author 4",
    status: "COMPLETE",
    currentPage: 0,
    totalPages: 300,
    notes: [],
    readingWindow: { from: 1699841938751, to: 1700197200000  },
    actualCompletionDate: 1654137600000,
  },
  {
    id: "5",
    title: "Book 5",
    author: "Author 5",
    status: "IN_PROGRESS",
    currentPage: 100,
    totalPages: 1000,
    notes: ["Note 1", "Note 2", "Note 3"],
    readingWindow: { from: 1699841938751, to: 1700197200000  },
    actualCompletionDate: null,
  }
];

export const INITIAL_STATE = {
  books: books,
};

export const reducer = (state = INITIAL_STATE, action: BookActionType) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      }
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload.id),
      }
    default:
      return state;
  }
};
