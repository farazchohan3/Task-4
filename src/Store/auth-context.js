import { React, createContext, useState } from "react";

import { app } from "../Store/firebase";
import { getDatabase, set, ref } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
const AuthContext = createContext({
  isAuthenticated: null,
  createUser: () => {},
  loginIntoApp: () => {},
  userLogged: () => {},
});

const database = getDatabase(app);
const auth = getAuth(app);
export const AuthContextProvider = (props) => {
  // User Regestration

  function createUser(values) {
    set(ref(database, `User/${values.userName}`), {
      username: values.userName,
      email: values.email,
      password: values.password,
    });
    createUserWithEmailAndPassword(auth, values.email, values.password).then(
      () => {}
    );
  }

  //   User Login
  function loginIntoApp(values) {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
      });
  }

  //Check user is Logged or Not
  const [isAuthenticated, setisAuthenticated] = useState(null);
  function userLogged() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setisAuthenticated(true);
        return isAuthenticated;
      } else {
        setisAuthenticated(false);
        return isAuthenticated;
      }
    });
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        createUser: createUser,
        loginIntoApp: loginIntoApp,
        userLogged: userLogged,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
