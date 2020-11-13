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
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { object, string } from "yup";

import useStyles from "./styles";
import FormikField from "components/core/FormikField";
import { useDispatch } from "react-redux";
import { login } from "redux/auth/auth.actions";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = object({
  email: string()
    .email("Invalid email format!")
    .required("Email are required!"),
  password: string().required("Password are required!"),
});

export const Login = () => {
  const classes = useStyles();
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to Your Account
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // let response = await loginUser(dispatch, values);
            // const res = await dispatch(login(values));
            dispatch(login(values));
            setSubmitting(false);
          }}
        >
          {({ submitForm, isSubmitting, dirty, isValid }) => (
            <Form className={classes.form}>
              <FormikField
                margin="normal"
                label="Email Address"
                name="email"
                type="email"
              />
              <FormikField
                margin="normal"
                name="password"
                label="Password"
                type="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {isSubmitting && <LinearProgress />}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting || !dirty || !isValid}
                className={classes.submit}
              >
                Log In With Email and Password
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={submitForm}
                className={classes.google}
              >
                Log In With Google Account
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/register">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Grid>
  );
};

export default Login;
