import { UserOutlined } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import * as authApi from "../api/auth";
import { AppContext } from "../App";

const Root = styled.div`
  width: 400px;
  padding: 50px;
  border: solid 1px lightgray;
  margin: 50px auto;
  border-radius: 10px;
  background-color: aliceblue;
`;

const Login = () => {
  const [userName, setUserName] = useState();
  const {setUser} = useContext(AppContext);

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  }
  const handleLogin = () => {
    authApi.login(userName).then(result => {
      localStorage.setItem('token', result.token);
      setUser({userName});
    }).catch(e => notification.error({message: 'Login failed'}));
  }
  return (
    <Root>
      <h3>Enter Capitolis transactions</h3>
      <Input
        placeholder="Please input 'capitolis'"
        size="large"
        value={userName}
        onChange={handleChangeUserName}
        addonAfter={<Button onClick={handleLogin}>Enter</Button>}
        prefix={<UserOutlined />}
      />
    </Root>
  );
};

export default Login;
