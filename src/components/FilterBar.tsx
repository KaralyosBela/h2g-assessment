import classes from "../components/FilterBar.module.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { setFilter } from "../features/bookSlice";
import { useEffect, useState } from "react";

export const FilterBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const isLoading = useAppSelector((state) => state.books.loading);
  const [activeTab, setActiveTab] = useState<number>(4);

  const addNewBook = () => {
    navigate("/books/new");
  };

  const applyFilter = (filter: string, activeFilter: number) => {
    setActiveTab(activeFilter);
    dispatch(setFilter(filter));
  }

  return (
    <>
      <div className={classes.filterBar}>
        <button className={classes.newButton} onClick={addNewBook}>New book</button>
        {isLoading && <div>Loading...</div>}
        <div className={classes.filterRight}>
          <div className={classes.filterTitle}>Filters:</div>
          <button className={activeTab === 1 ? classes.active : ""} onClick={() => applyFilter("new", 1)}>New</button>
          <button className={activeTab === 2 ? classes.active : ""} onClick={() => applyFilter("reading", 2)}>Reading</button>
          <button className={activeTab === 3 ? classes.active : ""} onClick={() => applyFilter("read", 3)}>Read</button>
          <button className={activeTab === 4 ? classes.active : ""} onClick={() => applyFilter("", 4)}>All</button>
        </div>
      </div>
      <hr />
    </>
  );
};
