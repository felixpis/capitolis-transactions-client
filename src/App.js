import axios from "axios";
import { createContext, useState } from "react";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";

export const AppContext = createContext();

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['token'] = token;
  }
  return config;
})

function App() {

  const [user, setUser] = useState();
  
  return (
    <AppContext.Provider value={{user, setUser}}>
      {user ? <Transactions /> : <Login />}
    </AppContext.Provider>
  );
}

export default App;
