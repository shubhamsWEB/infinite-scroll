import React from "react";
import Modal from "react-modal";
import "./style.css"
import { ImCancelCircle } from "react-icons/im";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    border: "none",
    boxShadow: "2px 2px 24px -6px rgba(6,6,6,0.75)",
    width: "auto",
  },
  
};
Modal.defaultStyles.overlay.backgroundColor = "rgba(232,232,232,.5)";
Modal.setAppElement("#root");
function ProjectModal({ modalIsOpen, setIsOpen }) {
  function closeModal() {
    setIsOpen({ value: false, imgUrl: "" });
  }

  return (
    <div className="relative">
      <Modal
        isOpen={modalIsOpen.value}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Image Modal"
        // shouldCloseOnOverlayClick={false}
      >
        <div className="absolute top-0 right-0 p-2">
          <ImCancelCircle fontSize="30" color="black" onClick={closeModal}/>
        </div>
        <div>
          <img src={modalIsOpen.imgUrl} alt="" className="p-6 rounded-3xl" />
        </div>
      </Modal>
    </div>
  );
}

export default ProjectModal;
