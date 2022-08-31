import { BookList } from "../components/BookList";
import { FilterBar } from "../components/FilterBar";
import { Layout } from "../ui/Layout";
import { IBook } from "../interface/book.inteface";
import classes from "./BooksPage.module.css";

interface Props {
  books: IBook[];
}

export const BooksPage: React.FC<Props> = ({ books }) => {
  return (
    <div className={classes.bookpage}>
      <Layout>
        <h1>Reading List</h1>
        <FilterBar />
        <BookList books={books} />
      </Layout>
    </div>
  );
};
