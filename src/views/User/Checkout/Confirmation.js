import { Button, Divider, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

let Confirmation = () => (
  <>
    <div>
      <Typography variant="h5">
        Thank you for your purchase, Shynn Huy!
      </Typography>
      <Divider />
      <Typography variant="subtitle2">Order ref: ref</Typography>
    </div>
    <br />
    <Button component={Link} variant="outlined" type="button" to="/">
      Back to home
    </Button>
  </>
);

export default Confirmation;
