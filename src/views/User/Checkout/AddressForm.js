import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormikField from "components/core/FormikField";
import api from "Api";

const AddressForm = ({ next }) => {
  const [district, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchDaNangDistrict = async () => {
      try {
        const { data } = await api.get("/checkout/district");
        if (isMounted) {
          setDistrict(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDaNangDistrict();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    const fetchWard = async () => {
      if (selectDistrict !== "") {
        try {
          const { data } = await api.get(
            `/checkout/district?ward=${selectDistrict}`
          );
          if (isMounted) {
            setWards(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchWard();
    return () => {
      isMounted = false;
    };
  }, [selectDistrict]);

  const handleChangeDistrict = (event, setFieldValue) => {
    const { value } = event.target;
    setSelectDistrict(value);
    setFieldValue("district", value);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          address: "",
          email: "",
          district: selectDistrict,
          ward: "",
        }}
        onSubmit={(values) => {
          next(values);
        }}
      >
        {({ setFieldValue, dirty, isValid }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormikField
                  name="firstName"
                  margin="none"
                  required
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField
                  required
                  margin="none"
                  name="lastName"
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField
                  required
                  margin="none"
                  name="address"
                  label="Address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField
                  required
                  margin="none"
                  name="email"
                  label="E-Mail"
                  type="email"
                />
              </Grid>
              {district.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Field
                    name="district"
                    as={TextField}
                    label="District"
                    margin="none"
                    variant="outlined"
                    select
                    fullWidth
                    helperText={<ErrorMessage name="district" />}
                    required
                    onChange={(e) => handleChangeDistrict(e, setFieldValue)}
                  >
                    {district.map((item) => (
                      <MenuItem key={item.code} value={item.slug}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
              )}
              {wards.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Field
                    name="ward"
                    as={TextField}
                    label="Ward"
                    margin="none"
                    variant="outlined"
                    select
                    fullWidth
                    helperText={<ErrorMessage name="ward" />}
                    required
                  >
                    {wards.map((item) => (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
              )}
            </Grid>
            <br />
            <Box display="flex" justifyContent="space-between">
              <Button variant="outlined" color="secondary">
                Close
              </Button>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                disabled={!dirty && isValid}
              >
                Next
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddressForm;
