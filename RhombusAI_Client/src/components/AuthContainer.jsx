import { useState } from "react";
import Profile from "./Profile";
import styled from "styled-components";
import Login from "./Login";
import Register from "./RegisterUserComponent";

const ButtonContainer = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-evenly;
  margin-bottom: 20px;
`;

const AuthContainer = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);

  const handleToggle = (isLogin) => {
    setShowLogin(isLogin);
  };
  const handleLoginSuccess = (loginData) => {
    setToken(loginData.token);
    setProfile({
      name: loginData.name || "Hello",
      email: loginData.email || "Hello@world",
    });
  };

  return (
    <div>
      {token ? (
        <Profile token={token} profile={profile} />
      ) : (
        <div>
          <ButtonContainer>
            <button onClick={() => handleToggle(true)}>Login</button>
            <button onClick={() => handleToggle(false)}>Register</button>
          </ButtonContainer>
          {showLogin ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Register />
          )}
        </div>
      )}
    </div>
  );
};

export default AuthContainer;
