import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Field } from "formik";
import React from "react";

const FormikRadio = ({ className,isSubmitting = false, items, name }) => {
  return (
    <Field className={className} as={RadioGroup} name={name}>
      {items.map((item, index) => (
        <FormControlLabel
          key={index}
          value={item.value}
          control={<Radio disabled={isSubmitting} />}
          label={item.label}
          disabled={isSubmitting}
        />
      ))}
    </Field>
  );
};

export default FormikRadio;
