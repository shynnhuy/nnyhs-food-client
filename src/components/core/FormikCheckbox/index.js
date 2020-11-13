import React from "react";
import { ErrorMessage, Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  error: {
    color: "#f44336",
    margin: "0 14px 18px 14px",
    textAlign: "left",
    fontSize: "0.75rem",
  },
});

const FormikCheckbox = ({ name, fields, error }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {fields.map((field, index) => (
        <Field
          key={index}
          type="checkbox"
          component={CheckboxWithLabel}
          name={name}
          value={field._id}
          Label={{ label: field.name }}
        />
      ))}
      <br />
      <ErrorMessage
        component={Typography}
        variant="body2"
        className={classes.error}
        name={name}
      />
    </React.Fragment>
  );
};

export default FormikCheckbox;
