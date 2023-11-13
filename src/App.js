import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import "./App.css";
import Welcome from "./Pages/Welcome";
import { useEffect, useContext, useState } from "react";
import Layout from "./Layout/Layout";
import AuthContext from "./Store/auth-context";
function App() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState();
  useEffect(() => {
    authCtx.userLogged();
    if (authCtx.isAuthenticated === false) {
      console.log(authCtx.isAuthenticated);
      navigate("/login");
    }
  }, [authCtx]);

  return (
    <Routes>
      {authCtx.isAuthenticated === true && (
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
        </Route>
      )}
      {authCtx.isAuthenticated === false && (
        <Route path="/login" element={<Login />} />
      )}
      {authCtx.isAuthenticated === false && (
        <Route path="/sign-up" element={<SignUp />} />
      )}
    </Routes>
  );
}

export default App;
