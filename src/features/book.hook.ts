import { useAppSelector } from "../app/hooks";
import { IBook } from "../interface/book.inteface";

const bookSelector = (state: {
  books: { books: IBook[]; filterOption: string };
}) => {
  return state.books.books.filter((book: IBook) => {
    if (state.books.filterOption === "read") return book.read;
    if (state.books.filterOption === "reading") return book.reading;
    return book;
  });
};

export const useBooks = () => useAppSelector(bookSelector);
