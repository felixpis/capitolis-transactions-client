import { Spin } from "antd";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as auth from "./api/auth";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";

export const AppContext = createContext();

const SpinWrapper = styled.div`
  margin: 50px;
  text-align: center;
`;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    auth.me().then((value) => {
      setUser(value);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {loading ? (
        <SpinWrapper>
          <Spin size="large" />
        </SpinWrapper>
      ) : user ? (
        <Transactions />
      ) : (
        <Login />
      )}
    </AppContext.Provider>
  );
}

export default App;
