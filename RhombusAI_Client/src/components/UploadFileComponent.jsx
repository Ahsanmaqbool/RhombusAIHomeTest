import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
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

const FileName = styled.p`
  margin-top: 10px;
  color: #333;
`;

const UploadFileComponent = ({ token, handleFileResponse, setError }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/process-file/",
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        handleFileResponse(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Authentication credentials were not provided.");
        } else {
          setError("An error occurred while uploading the file.");
        }
      }
    }
  };

  return (
    <Container>
      <Title>Upload File</Title>
      <Input type="file" id="fileInput" onChange={handleFileChange} />
      <Label htmlFor="fileInput">Choose File</Label>
      {selectedFile && <FileName>{selectedFile.name}</FileName>}
      <button onClick={handleSubmit}>Upload</button>
    </Container>
  );
};

export default UploadFileComponent;
