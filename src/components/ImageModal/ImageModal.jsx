import Modal from "react-modal";
import css from "./ImageModal.module.css";
Modal.setAppElement("#root");
export default function ImageModal({ isOpen, onRequestClose, imgUrl, imgAlt }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <img src={imgUrl} alt={imgAlt} style={css.img} />
    </Modal>
  );
}
