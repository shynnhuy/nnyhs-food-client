import { useContext } from "react";
import { ModalContext } from "context/ModalContext";

export default () => {
  const { handleModal } = useContext(ModalContext);
  return handleModal;
};
