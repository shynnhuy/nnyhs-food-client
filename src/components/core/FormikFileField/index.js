import React from "react";
import { Field } from "formik";
import { Button, Input } from "@material-ui/core";

const FormikFileField = ({ name, label, previewFile, className }) => {
  const fileRef = React.useRef(null);
  const handleClick = (e) => {
    fileRef.current.click();
  };
  return (
    <Field name={name}>
      {({ form }) => {
        const handleFileChange = (e) => {
          e.preventDefault();
          const file = e.target.files[0];
          form.setFieldValue(name, file);
          previewFile(file);
        };
        return (
          <React.Fragment>
            <Button
              variant="outlined"
              onClick={handleClick}
              className={className}
            >
              Choose {label}
            </Button>
            <Input
              type="file"
              onChange={handleFileChange}
              inputRef={fileRef}
              style={{ display: "none" }}
            />
          </React.Fragment>
        );
      }}
    </Field>
  );
};

export default FormikFileField;
