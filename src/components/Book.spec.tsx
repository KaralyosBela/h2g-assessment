import { fireEvent, render, screen } from "@testing-library/react";
import { Book } from "./Book";

// const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();

const mockDispatch = jest.fn();
const mockEditBook = jest.fn();
const mockUseDispatch = jest.fn(() => mockDispatch);
const mockNavigate = jest.fn();
const mockUseNavigate = jest.fn(() => ({ mockNavigate }));

jest
  .mock("react-router-dom", () => ({
    useNavigate: () => mockUseNavigate,
  }))
  .mock("react-redux", () => ({
    useDispatch: () => mockUseDispatch,
  }))
  .mock("../features/bookSlice", () => ({
    editBook: (...params: unknown[]) => mockEditBook(params),
  }));

describe("book", () => {
  it("should render component when is read", () => {
    const book = {
      id: 1,
      title: "testTitle",
      author: "testAuthor",
      description: "testDescription",
      reading: false,
      read: true,
    };
    const { container } = render(<Book book={book} />);
    expect(container).toMatchSnapshot();
  });

  it("should render component when is reading", () => {
    const book = {
      id: 1,
      title: "testTitle",
      author: "testAuthor",
      description: "testDescription",
      reading: true,
      read: false,
    };
    const { container } = render(<Book book={book} />);
    expect(container).toMatchSnapshot();
  });

  it("should render component when edit is clicked", () => {
    const book = {
      id: 1,
      title: "testTitle",
      author: "testAuthor",
      description: "testDescription",
      reading: true,
      read: false,
    };
    const { container } = render(<Book book={book} />);
    fireEvent.click(screen.getByTestId("edit-button"));
    expect(mockUseNavigate.mock.calls).toEqual([["/books/edit/1"]]);
    expect(container).toMatchSnapshot();
  });

  it("should render component when reading is clicked", () => {
    const book = {
      id: 1,
      title: "testTitle",
      author: "testAuthor",
      description: "testDescription",
      reading: false,
      read: true,
    };
    mockEditBook.mockReturnValue("mockEditBook");
    const { container } = render(<Book book={book} />);
    fireEvent.click(screen.getByTestId("reading-button"));
    expect(mockUseDispatch.mock.calls).toEqual([["mockEditBook"]]);
    expect(mockEditBook.mock.calls).toEqual([
      [
        [
          {
            author: "testAuthor",
            description: "testDescription",
            id: 1,
            read: false,
            reading: true,
            title: "testTitle",
          },
        ],
      ],
    ]);
    expect(container).toMatchSnapshot();
  });

  it("should render component when read is clicked", () => {
    const book = {
      id: 1,
      title: "testTitle",
      author: "testAuthor",
      description: "testDescription",
      reading: true,
      read: false,
    };
    mockEditBook.mockReturnValue("mockEditBook");
    const { container } = render(<Book book={book} />);
    fireEvent.click(screen.getByTestId("read-button"));
    expect(mockUseDispatch.mock.calls).toEqual([["mockEditBook"]]);
    expect(mockEditBook.mock.calls).toEqual([
      [
        [
          {
            author: "testAuthor",
            description: "testDescription",
            id: 1,
            read: true,
            reading: false,
            title: "testTitle",
          },
        ],
      ],
    ]);
    expect(container).toMatchSnapshot();
  });
});
