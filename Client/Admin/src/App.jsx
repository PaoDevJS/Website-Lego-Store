import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout/Layout";
import { useSelector } from "react-redux";

const App = () => {
  const currentUser = useSelector(state => state.User.currentUser)
  const navigate = useNavigate(); 

  {
    useEffect(() => {
      const path = () => {
        currentUser ? navigate("/") : navigate("/login");
      };
      path();
    }, [currentUser, navigate]);
  }

  return <> {currentUser ? <Layout /> : <Login />} </>;
};

export default App;
