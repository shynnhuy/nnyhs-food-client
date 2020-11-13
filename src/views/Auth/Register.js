import React from "react";
import {
  Avatar,
  Paper,
  FormControlLabel,
  Grid,
  Checkbox,
  Button,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, useHistory } from "react-router-dom";

import useStyles from "./styles";

import { Formik, Form } from "formik";
import { number, object, string } from "yup";
import FormikField from "components/core/FormikField";
import FormikSelect from "components/core/FormikSelect";
import { useDispatch } from "react-redux";
import { register } from "redux/auth/auth.actions";

const initialValues = {
  displayName: "",
  email: "",
  age: 0,
  password: "",
  address: "",
  gender: "",
};

const validationSchema = object({
  displayName: string().required("Display name are required!").min(4).max(16),
  email: string()
    .email("Invalid email format!")
    .required("Email are required!"),
  age: number().positive("Age must be a positive number"),
  address: string(),
  gender: string().required("Gender are required"),
  password: string().required("Password are required!").min(6).max(15),
});

const genderItems = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Neutral",
    value: "neutral",
  },
];

export const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={8}
      lg={5}
      component={Paper}
      className={classes.root}
      elevation={6}
      square
    >
      <div className={classes.paperRegister}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a New Account
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            try {
              dispatch(register(values));
              setSubmitting(false);
              history.push("/");
            } catch (error) {
              setSubmitting(false);
              console.log(error);
            }
          }}
        >
          {({ submitForm, isSubmitting, dirty, isValid }) => (
            <Form className={classes.form}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <FormikField label="Email Address" name="email" />
                </Grid>
                <Grid item xs={12}>
                  <FormikField label="Address" name="address" />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <FormikField label="Display Name" name="displayName" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormikSelect
                    name="gender"
                    items={genderItems}
                    label="Gender"
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <FormikField type="number" label="Age" name="age" />
                </Grid>
                <Grid item xs={12}>
                  <FormikField
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Grid>
              </Grid>
              {isSubmitting && <LinearProgress />}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting || !dirty || !isValid}
                onClick={submitForm}
                className={classes.submit}
              >
                Create Account
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="body2">
                    <Link to="/login">Already have an account? Login</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Grid>
  );
};

export default Register;
