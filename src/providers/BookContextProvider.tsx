'use client';
import React, { createContext, useContext, useReducer } from 'react';
import {
  BookActionType,
  reducer,
  Book,
  INITIAL_STATE,
} from '@/reducers/book-reducer';

interface BookStateType {
  books: Book[];
}

interface BookContextValue {
  state: BookStateType,
  dispatch: React.Dispatch<BookActionType>;
}

export const BookContext = createContext<BookContextValue>({
  state: INITIAL_STATE,
  dispatch: () => { },
});

export const useBookContext = () => useContext(BookContext);

interface BookContextProps {
  children: React.ReactNode;
}

export const BookContextProvider: React.FC<BookContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  )
}