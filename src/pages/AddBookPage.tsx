import classes from "../pages/AddEditPage.module.css";
import { Layout } from "../ui/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addBook } from "../features/bookSlice";

export const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const firstRender = useRef(true);

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isTitleModified, setIsTitleModified] = useState<boolean>(false);
  const [isAuthorModified, setIsAuthorModified] = useState<boolean>(false);

  const onChangeTitle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsTitleModified(true);
  };
  const onChangeAuthor = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAuthor(event.currentTarget.value);
    setIsAuthorModified(true);
  };
  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setDescription(event.currentTarget.value);

  const backToHome = () => navigate("/");

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisabled(formValidation());
  }, [title, author]);

  const formValidation = (): boolean => {
    if (title.length === 0) {
      setErrorMessage("Title must be filled!");
      return true;
    } else if (author.length === 0) {
      setErrorMessage("Author must be filled!");
      return true;
    }
    setErrorMessage(null);
    return false;
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(
        addBook({
          id: Math.floor(Math.random() * 1000),
          title: title,
          author: author,
          description: description,
          reading: true,
          read: false,
        })
      ).unwrap();
      navigate("/books");
    } catch (error: any) {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Layout>
        {isLoading && <p>Loading...</p>}
        <h1>Add new book</h1>
        <form onSubmit={submitForm} className={classes.form}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className={
              title || !isTitleModified ? classes.valid : classes.invalid
            }
            onChange={onChangeTitle}
          ></input>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            className={
              author || !isAuthorModified ? classes.valid : classes.invalid
            }
            onChange={onChangeAuthor}
          ></input>
          <label htmlFor="desc">Description</label>
          <textarea id="desc" onChange={onChangeDescription}></textarea>
          <div className={classes.actions}>
            <button
              className={
                errorMessage
                  ? classes.submitBtnDisabled
                  : classes.submitBtnEnabled
              }
              type="submit"
              disabled={disabled}
            >
              Submit
            </button>
            <button
              className={classes.cancelBtn}
              type="button"
              onClick={backToHome}
            >
              Cancel
            </button>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          {error && <div className={classes.error}>{error}</div>}
        </form>
      </Layout>
    </div>
  );
};
