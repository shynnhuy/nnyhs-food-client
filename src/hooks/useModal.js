import { useContext } from "react";
import { ModalContext } from "context/ModalContext";

export default () => {
  const { handleModal, onClose } = useContext(ModalContext);
  return { handleModal, onClose };
};
