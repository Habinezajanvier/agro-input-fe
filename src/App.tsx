import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { Provider } from "react-redux";
import { store } from "./store";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect } from "react";
import apis from "./store/apis";

const token = localStorage.getItem("x-token");

function App() {
  const chechInitialAuth = useCallback(async () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token as string);
        if (decodedToken.exp! * 1000 > Date.now()) {
          apis.setAuthorisation(token as string);
        }
      }
    } catch (error) {
      // navigate("/", {});
    }
  }, []);

  useEffect(() => {
    chechInitialAuth();
  }, [chechInitialAuth]);

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {/* <Home /> */}
      </Provider>
    </>
  );
}

export default App;
