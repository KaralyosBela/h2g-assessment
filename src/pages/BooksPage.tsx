import { BookList } from "../components/BookList";
import { FilterBar } from "../components/FilterBar";
import { Layout } from "../ui/Layout";
import { IBook } from "../interface/book.inteface";
import classes from "./BooksPage.module.css";
import { useEffect, useState } from "react";

interface Props {
  books: IBook[];
}

export const BooksPage: React.FC<Props> = ({ books }) => {

  const [isLoading, setisLoading] = useState<boolean>(false);
  const loading = (loadStatus: boolean) => {
    setisLoading(loadStatus);
  }

  return (
    <div className={classes.bookpage}>
      <Layout>
      {isLoading && <p>Loading...</p>}
        <h1>Reading List</h1>
        <FilterBar />
        <BookList books={books} loading={loading}/>
      </Layout>
    </div>
  );
};
