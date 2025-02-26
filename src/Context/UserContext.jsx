import { createContext, useState, useEffect } from "react";

export let UserContext = createContext(null)

export default function UserContextProvider({ children }) {
  let [isLogin, setLogin] = useState(null);
  let [cartNum, setCartNums] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('token'))
      setLogin(localStorage.getItem('token'))
  }, [])

  return (
    <UserContext.Provider value={{ isLogin, setLogin, cartNum, setCartNums }}>
      {children}
    </UserContext.Provider>
  );
}