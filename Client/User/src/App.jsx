import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { AppContext } from "./Context/ThemeContext";
import { useContext, useEffect } from "react";

const App = () => {
  const { currentUser } = useContext(AppContext)
  useEffect(() => {
    if(!currentUser.isUser) {
      console.log("Remove")
      localStorage.removeItem("tokenSignIN")
    }
  }, [currentUser, currentUser.isUser])

  return (
    <main className="w-full h-[100vh]">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default App;
