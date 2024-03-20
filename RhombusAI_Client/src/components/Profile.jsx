import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import UploadFile from "./UploadFileComponent";
import PopupModal from "./PopupModal";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const UserInfo = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 10px 0px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.p`
  margin-bottom: 10px;
  font-size: 16px;

  strong {
    font-weight: bold;
  }
`;

const LogoutButton = styled.button`
  // position: absolute;
  // top: 10px;
  // left: 10px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditProfileModal = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const EditProfileButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
`;
const Profile = ({ token, profile, setProfile, setToken }) => {
  const [fileResponse, setFileResponse] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState(profile.name);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/user/me/",
        {
          email,
          password,
          name,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProfile({
          ...profile,
          email,
          name,
        });
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Edit profile failed:", error);
    }
  };
  const handleFileResponse = (response) => {
    if (response.status === 200) {
      setFileResponse(response.data.data);
      setError(null);
    } else {
      setError("An error occurred while processing the file.");
      setFileResponse(null);
    }
  };

  const handleClear = () => {
    setError(null);
    setFileResponse(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/logout/",
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProfile(false);
        setToken(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Container>
      <ButtonsWrapper>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        <LogoutButton onClick={() => setShowEditModal(true)}>
          Edit Profile
        </LogoutButton>
      </ButtonsWrapper>
      <Title>{profile.email}</Title>
      <UserInfo>
        <InfoItem>
          <strong>Email:</strong> {profile.email}
        </InfoItem>
        <InfoItem>
          <strong>Token:</strong> {token}
        </InfoItem>
      </UserInfo>
      <UploadFile
        token={token}
        handleFileResponse={handleFileResponse}
        setError={setError}
      />
      <PopupModal
        error={error}
        fileResponse={fileResponse}
        clearError={handleClear}
      />
      <EditProfileModal isOpen={showEditModal}>
        <form onSubmit={handleEditProfileSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <EditProfileButton type="submit">Save Changes</EditProfileButton>
        </form>
      </EditProfileModal>
    </Container>
  );
};

Profile.propTypes = {
  token: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  setProfile: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default Profile;
