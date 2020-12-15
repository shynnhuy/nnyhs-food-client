import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { Modal, Backdrop, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    width: theme.breakpoints.values.md,
    maxWidth: theme.breakpoints.values.md,
    [theme.breakpoints.down("sm")]: {
      width: theme.breakpoints.values.sm - theme.spacing(28),
    },
  },
}));

const SModal = ({ open, handleModal, content, onClose }) => {
  const classes = useStyles();

  return createPortal(
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Paper className={classes.paper}>{content}</Paper>
    </Modal>,
    document.getElementById("modal")
  );
};

SModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleModal: PropTypes.func,
  content: PropTypes.any,
  onClose: PropTypes.func,
};

export default SModal;
