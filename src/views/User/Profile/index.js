import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Container,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { array, object, string } from "yup";

import useStyles from "./styles";
import FormikField from "components/core/FormikField";
import FormikRadio from "components/core/FormikRadio";
import FormikCheckbox from "components/core/FormikCheckbox";

import { updateInfo } from "redux/auth/auth.actions";
import { createShop, loadShop } from "redux/shop/shop.actions";
import { useSocket } from "context/SocketContext";

export const Profile = ({ auth, shop }) => {
  const socket = useSocket();

  const { user } = auth;

  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => setValue(newValue);

  const classes = useStyles();
  const dispatch = useDispatch();

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

  const initalStateUser = {
    email: user.email,
    displayName: user.displayName,
    address: user.address,
    age: user.age,
    gender: user.gender,
  };

  const initalStateShop = {
    name: "",
    address: "",
    categories: [],
    identityCard: "",
  };
  const validationSchemaShop = object({
    name: string().required("Name are required!"),
    address: string().required("Address are required!"),
    categories: array().min(1).required("Category are required!"),
    identityCard: string().required("Identity Card are required!"),
  });

  const validationSchemaUser = object({
    email: string()
      .email("Invalid email format!")
      .required("Email are required!"),
    displayName: string().required("Display Name are required!"),
    address: string().required("Address are required!"),
    age: string().required("Age are required!"),
  });

  React.useEffect(() => {
    socket.on("onchange_request_status", (res) => dispatch(loadShop(res)));
  });

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h2" gutterBottom>
        {user?.displayName} Profile
      </Typography>
      <Paper square elevation={5} className={classes.tab}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Profile" />
          {auth.isRequestShop ? (
            <Tab label="Shop Detail" />
          ) : (
            <Tab label="Shop Register" />
          )}
        </Tabs>

        <TabPanel value={value} index={0}>
          <Formik
            initialValues={initalStateUser}
            validationSchema={validationSchemaUser}
            onSubmit={async (values, { setSubmitting }) => {
              // console.log(values);
              dispatch(updateInfo(values));
              setSubmitting(false);
            }}
          >
            {({ submitForm, isSubmitting, dirty, isValid, errors }) => (
              <Form className={classes.form}>
                <FormikField
                  margin="normal"
                  label="Email Address"
                  name="email"
                  type="email"
                  error={errors.email}
                  disabled
                />
                <FormikField
                  margin="normal"
                  label="Display Name"
                  name="displayName"
                  error={errors.displayName}
                />
                <FormikField
                  margin="normal"
                  label="Address"
                  name="address"
                  error={errors.address}
                />
                <FormikField
                  margin="normal"
                  label="Age"
                  name="age"
                  error={errors.age}
                  type="number"
                />
                <FormikRadio
                  className={classes.radio}
                  name="gender"
                  items={genderItems}
                  isSubmitting={isSubmitting}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={submitForm}
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  UPDATE INFORMATION
                </Button>
              </Form>
            )}
          </Formik>
        </TabPanel>
        {auth.isRequestShop ? (
          <TabPanel value={value} index={1}>
            <Typography variant="h6" align="center">
              Shop id: {shop.details._id}
            </Typography>
            <Typography variant="h6" align="center">
              Shop status:{" "}
              <span
                className={
                  shop.details.status === "approval"
                    ? classes.accept
                    : classes.refuse
                }
              >
                {shop.details.status}
              </span>
            </Typography>
          </TabPanel>
        ) : (
          <TabPanel value={value} index={1}>
            <Formik
              initialValues={initalStateShop}
              validationSchema={validationSchemaShop}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                dispatch(createShop(values));
                setSubmitting(false);
              }}
            >
              {({
                submitForm,
                isSubmitting,
                dirty,
                isValid,
                touched,
                errors,
              }) => (
                <Form className={classes.form}>
                  <FormikField
                    margin="normal"
                    label="Name Shop"
                    name="name"
                    error={touched.name && errors.name}
                  />
                  <FormikField
                    margin="normal"
                    label="Address"
                    name="address"
                    error={touched.address && errors.address}
                  />
                  <FormikField
                    margin="normal"
                    label="Identity Card"
                    name="identityCard"
                    error={touched.identityCard && errors.identityCard}
                  />
                  <FormikCheckbox name="categories" fields={shop.categories} />
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={submitForm}
                    fullWidth
                    disabled={isSubmitting || !dirty || !isValid}
                  >
                    REGISTER TO BE OUT PARTNER
                  </Button>
                </Form>
              )}
            </Formik>
          </TabPanel>
        )}
      </Paper>
      {/* </Box> */}
    </Container>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const mapState = (state) => ({
  auth: state.auth,
  shop: state.shop,
});

export default connect(mapState)(Profile);
