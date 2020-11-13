import React, { createContext } from "react";
import Modal from "components/core/SModal";

let ModalContext;
let { Provider } = (ModalContext = createContext());

let ModalProvider = ({ children }) => {
  let [open, setOpen] = React.useState(false);
  let [modalContent, setModalContent] = React.useState("I'm the Modal Content");
  let onClose = () => setOpen(false);
  let handleModal = (content = false) => {
    setOpen(!open);
    if (content) {
      setModalContent(content);
    }
  };

  return (
    <Provider value={{ handleModal }}>
      <Modal
        open={open}
        handleModal={handleModal}
        content={modalContent}
        onClose={onClose}
      />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
