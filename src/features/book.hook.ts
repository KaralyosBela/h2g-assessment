import { useAppSelector } from "../app/hooks";
import { IBook } from "../interface/book.inteface";

const bookSelector = (state: {
  books: { books: IBook[]; filterOption: string };
}) => {
  return state.books.books.filter((book: IBook) => {
    //az engedélyezett státuszok, key alapján fogja vissza adni az elemet
    if (["read", "reading", "new"].includes(state.books.filterOption)) {
      const key = mapOptionToKey(state.books.filterOption) as keyof IBook;
      return book[key];
    } else {
      return book;
    }
    // if (state.books.filterOption === "read") return book.read;
    // if (state.books.filterOption === "reading") return book.reading;
    // return book;
  });
};

export const useBooks = () => useAppSelector(bookSelector);


//azért van, hogyha esetelg változna az IBook interface, vagy a read/reading filter option név, akkor ne legeyn belőle probléma
//pl név mismatch
const mapOptionToKey = (option: string) =>
  ({
    read: "read",
    reading: "reading",
    new: "new",
  }[option]);
