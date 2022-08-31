import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IBook } from "../interface/book.inteface";

const baseUrl = "http://localhost:8000";

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/books`);
      const bookData: IBook = response.data.map((item: IBook) => {
        return {
          id: item.id,
          title: item.title,
          author: item.author,
          description: item.description,
          reading: item.reading,
          read: item.read,
        };
      });
      return bookData;
    } catch (error) {
      return rejectWithValue(`Fetch failed! (${error})`);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook: IBook, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/books`, newBook);
      return response.data;
    } catch (error) {
      return rejectWithValue(`Add failed! (${error})`);
    }
  }
);

export const editBook = createAsyncThunk(
  "books/editBook",
  async (editedBook: IBook, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/books/${editedBook.id}`,
        editedBook
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(`Edit failed! (${error})`);
    }
  }
);

interface bookState {
  books: IBook[];
  filterOption: string;
  loading: boolean;
  errors: {
    fetchError: boolean;
    errMessage: string;
  };
}

const initialState: bookState = {
  books: [],
  filterOption: "",
  loading: false,
  errors: {
    fetchError: false,
    errMessage: "",
  },
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filterOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.fulfilled, (state, action: PayloadAction<IBook>) => {
        state.books = Object.values(action.payload);
        state.loading = false;
      })
      .addCase(getBooks.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errors.fetchError = true;
        state.errors.errMessage = action.payload;
      })
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<IBook>) => {
        state.books.push(action.payload);
        state.loading = false;
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBook.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errors.fetchError = true;
        state.errors.errMessage = action.payload;
      })
      .addCase(editBook.fulfilled, (state, action: PayloadAction<IBook>) => {
        const index = state.books.findIndex(
          (book: IBook) => book.id === action.payload.id
        );
        state.books[index] = action.payload;
        state.loading = false;
      })
      .addCase(editBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(editBook.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.errors.fetchError = true;
        state.errors.errMessage = action.payload;
      });
  },
});

export const { setFilter } = bookSlice.actions;
export default bookSlice.reducer;
