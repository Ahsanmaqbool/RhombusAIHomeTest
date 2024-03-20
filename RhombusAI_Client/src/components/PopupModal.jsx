import Modal from "react-modal";
import ErrorComponent from "./ErrorComponent";
import ProcessedDataComponent from "./ProcessedDataComponent";

const PopupModal = ({ error, fileResponse, clearError }) => {
  return (
    <Modal
      isOpen={error || fileResponse} // Show modal if there is an error or file response
      onRequestClose={clearError} // Function to clear error state
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "600px",
          maxHeight: "80%",
          overflow: "visible", // Set overflow to visible to prevent modal content from being clipped
        },
      }}
    >
      <div>
        {" "}
        {/* Make the content scrollable */}
        {(error || fileResponse) && (
          <button onClick={clearError} style={{ float: "left" }}>
            Clear
          </button>
        )}
        {error && <ErrorComponent message={error} />}
        {fileResponse && <ProcessedDataComponent data={fileResponse} />}
      </div>
    </Modal>
  );
};

export default PopupModal;
