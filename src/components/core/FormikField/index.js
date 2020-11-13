import React from "react";
import { ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";

const FormikField = ({
  margin = "dense",
  name,
  label,
  variant = "outlined",
  multiline = false,
  rows = 1,
  type = "text",
  required = false,
  error,
  disabled = false,
}) => {
  return (
    <Field
      error={error ? true : false}
      required={required}
      autoComplete="off"
      as={TextField}
      label={label}
      name={name}
      fullWidth
      margin={margin}
      type={type}
      multiline={multiline}
      rows={rows}
      variant={variant}
      disabled={disabled}
      helperText={<ErrorMessage name={name} />}
    />
  );
};

export default FormikField;
