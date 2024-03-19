import PropTypes from "prop-types";
import styled from "styled-components";

const ErrorContainer = styled.div`
  padding: 10px;
  background-color: #ffcccc;
  border-radius: 8px;
`;

const ErrorMessage = styled.p`
  color: #cc0000;
`;

const ErrorComponent = ({ error }) => {
  return (
    <ErrorContainer>
      <ErrorMessage>Error: {error}</ErrorMessage>
    </ErrorContainer>
  );
};

ErrorComponent.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorComponent;
