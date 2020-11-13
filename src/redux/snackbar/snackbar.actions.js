import React from "react";
import { v4 as uuid } from "uuid";
import { Button, Typography } from "@material-ui/core";

import {
  CLOSE_SNACKBAR,
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
} from "./snackbar.types";

export const enqueueSnackbar = ({
  message,
  status,
  vertical = "bottom",
  horizontal = "right",
}) => (dispatch) => {
  const key = uuid();

  const noti = {
    key,
    message: message,
    options: {
      key,
      variant: status,
      anchorOrigin: {
        vertical,
        horizontal,
      },
      action: (key) => (
        <Button onClick={() => dispatch(closeSnackbar(key))}>
          <Typography variant="button">Close</Typography>
        </Button>
      ),
    },
  };

  dispatch({
    type: ENQUEUE_SNACKBAR,
    notification: { ...noti },
  });
};

export const closeSnackbar = (key) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
});
