import { useAppSelector } from "../app/hooks";
import { IBook } from "../interface/book.inteface";

const selectedBookSelector =
  (id: number) => (state: { books: { books: IBook[] } }) => {
    return state.books.books.filter((book: IBook) => book.id === id)[0];
  };

export const useSelectedBook = (id: number) =>
  useAppSelector(selectedBookSelector(id));
