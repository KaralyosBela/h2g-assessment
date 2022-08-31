import { IBook } from "../interface/book.inteface";
import classes from "../components/Book.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { editBook } from "../features/bookSlice";
import {RiEditCircleFill} from "react-icons/ri"
import { useState } from "react";

interface Props {
  book: IBook;
  loading: (loadStatus: boolean) => void;
}

export const Book: React.FC<Props> = ({ book, loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [error, setError] = useState<boolean>(false);

  const navigateToEditBook = (id: number) => {
    navigate(`/books/edit/${id}`);
  };

  const changeBookStatus = async (status: string) => {
    if (status === "reading" && book.reading === false) {
      loading(true);
      try {
        await dispatch(
          editBook({
            ...book,
            reading: !book.reading,
            read: !book.read,
          })
        ).unwrap();
      } catch (erro: any) {
        setError(error);
      }
      loading(false);
    } else if (status === "read" && book.read === false) {
      loading(true);
      try {
        await dispatch(
          editBook({
            ...book,
            reading: !book.reading,
            read: !book.read,
          })
        ).unwrap();
      } catch (error: any) {
        setError(error);
      }
      loading(false);
    }
  };

  return (
    <div className={classes.bookElement}>
      {book.title}
      <div className={classes.interaction}>
        <button data-testid="edit-button" className={classes.editBtn} onClick={() => navigateToEditBook(book.id)}>Edit<RiEditCircleFill size={10} color={"white"}/></button>
        <button data-testid="new-button">New</button>
        <button
          data-testid="reading-button"
          className={book.reading ? classes.active : ""}
          onClick={() => changeBookStatus("reading")}>Reading</button>
        <button
          data-testid="read-button"
          className={book.read ? classes.active : ""}
          onClick={() => changeBookStatus("read")}>Read
        </button>
      </div>
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
};
