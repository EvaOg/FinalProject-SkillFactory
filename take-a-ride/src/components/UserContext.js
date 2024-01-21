import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("user") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  function setUserHandler(user, token) {
    setIsAuth(user);
    setToken(token);
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
    console.log(token);
  }

  return (
    <UserContext.Provider
      value={{
        isAuth,
        setUserHandler,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
