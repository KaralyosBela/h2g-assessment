import { Layout } from "../ui/Layout";
import classes from "../pages/ErrorPage.module.css";
import { useNavigate } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const backToMainPage = () => {
    navigate("/");
  }

  return (
    <div className={classes.error_page}>
      <Layout>
        <h1>404 - Page not found.</h1>
        <p onClick={backToMainPage}>Back to main page.</p>
      </Layout>
    </div>
  );
};
