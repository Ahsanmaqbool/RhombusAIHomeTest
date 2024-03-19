import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import UploadFile from "./UploadFileComponent";
import ErrorComponent from "./ErrorComponent";
import ProcessedDataComponent from "./ProcessedDataComponent";

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

const Profile = ({ token, profile }) => {
  const [fileResponse, setFileResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileResponse = (response) => {
    if (response.status === 200) {
      console.log("in handl responses", response);
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

  return (
    <Container>
      <Title>User Profile</Title>
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
      {(error || fileResponse) && <button onClick={handleClear}>Clear</button>}
      {error && <ErrorComponent message={error} />}

      {fileResponse && <ProcessedDataComponent data={fileResponse} />}
    </Container>
  );
};

Profile.propTypes = {
  token: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
