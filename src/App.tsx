import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BooksPage } from "./pages/BooksPage";
import { AddBookPage } from "./pages/AddBookPage";
import { EditBookPage } from "./pages/EditBookPage";
import { ErrorPage } from "./pages/ErrorPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBooks } from "./features/bookSlice";
import { AppDispatch } from "./app/store";
import { useBooks } from "./features/book.hook";

export const App: React.FC = () => {
  const bookList = useBooks();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<BooksPage books={bookList} />} />
        <Route path="/books" element={<BooksPage books={bookList} />} />
        <Route path="/books/new" element={<AddBookPage />} />
        <Route path="/books/edit/:id" element={<EditBookPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};
