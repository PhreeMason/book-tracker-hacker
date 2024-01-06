
const BOOKS_API_SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?projection=lite&q=';
import { GoogleBooksApiResponse, GoogleBook } from "../types";

export const searchBooksApi = async (query: string): Promise<GoogleBook[]> => {
  const booksResponse = await fetch(`${BOOKS_API_SEARCH_URL}${query}`);

  if (!booksResponse.ok) {
    return [];
  }

  const booksResponseJSON: GoogleBooksApiResponse = await booksResponse.json();
  const { items } = booksResponseJSON;
  return items;
}