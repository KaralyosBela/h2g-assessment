import React from "react";
import classes from "../ui/Layout.module.css";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};
