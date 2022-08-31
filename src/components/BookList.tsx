import { useAppSelector } from "../app/hooks";
import { IBook } from "../interface/book.inteface";
import { Book } from "./Book";
import classes from "./BookList.module.css";

interface Props {
  books: IBook[];
}

export const BookList: React.FC<Props> = ({ books }) => {
  
  const error = useAppSelector((state) => state.books.errors);

  return (
    <div className={classes.bookList}>
      {books.length > 0 &&
        books.map((book) => {
          return <Book book={book} key={book.id} />;
        })}
      {error.fetchError && (
        <div className={classes.error}>{error.errMessage}</div>
      )}
    </div>
  );
};
