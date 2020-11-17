import React from "react";
import { Field, ErrorMessage } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";

// const MaterialUISelectField = ({
//   errorString,
//   label,
//   children,
//   value,
//   name,
//   onChange,
//   onBlur,
//   required,
//   variant,
// }) => {
//   return (
//     <FormControl fullWidth>
//       <InputLabel>{label}</InputLabel>
//       <Select name={name} onChange={onChange} onBlur={onBlur} value={value} label={label}>
//         {children}
//       </Select>
//       <FormHelperText>{errorString}</FormHelperText>
//     </FormControl>
//   );
// };

const FormikSelect = ({
  name,
  items,
  variant = "outlined",
  label,
  required = false,
  className = "",
  onChange = () => {},
}) => {
  return (
    <div className={className}>
      <Field
        name={name}
        as={TextField}
        label={label}
        select
        fullWidth
        variant={variant}
        helperText={<ErrorMessage name={name} />}
        required={required}
        onChange={onChange}
      >
        {items.map((item, idx) => (
          <MenuItem key={idx} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Field>
    </div>
  );
};

export default FormikSelect;
