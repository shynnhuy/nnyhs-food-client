import React, { useState } from "react";
import {
  Paper,
  Grid,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  TextField,
  makeStyles,
  Button,
  ListItemSecondaryAction,
  Avatar,
  Collapse,
} from "@material-ui/core";
import {
  StoreMallDirectoryTwoTone as Detail,
  ReceiptTwoTone as Category,
  RestaurantTwoTone as Product,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import { connect } from "react-redux";
import { Formik, Form, useFormik, Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import ProductList from "./ProductList";

const Shop = ({ shop }) => {
  // const shop = useSelector((state) => state.shop);
  const [selected, setSelected] = useState(0);
  const [category, setCategory] = useState();
  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} md={3}>
          <ShopNav
            selected={selected}
            setSelected={setSelected}
            setCategory={setCategory}
            categories={shop.details.categories}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Paper className={classes.Form}>
            <ShopMain
              value={selected}
              index={0}
              {...shop.details}
              component={ShopDetail}
            />
            <ShopMain
              value={selected}
              index={1}
              component={ShopChangeCategory}
              init={shop.details.categories.map((e) => e._id)}
              categories={shop.categories}
            />
            <ShopMain
              value={selected}
              index={2}
              category={category}
              shop={shop.details._id}
              component={ProductList}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const ShopNav = ({ selected, setSelected, setCategory, categories }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleToggleProducts = () => setOpen(!open);
  const changeCategory = (code) => {
    setCategory(code);
    setSelected(2);
  };
  return (
    <List component={Paper}>
      <ListItem button selected={selected === 0} onClick={() => setSelected(0)}>
        <ListItemIcon>
          <Detail />
        </ListItemIcon>
        <ListItemText>Details</ListItemText>
      </ListItem>
      <ListItem button selected={selected === 1} onClick={() => setSelected(1)}>
        <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText>Categories</ListItemText>
      </ListItem>
      <ListItem button onClick={handleToggleProducts}>
        <ListItemIcon>
          <Product />
        </ListItemIcon>
        <ListItemText>Products</ListItemText>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {categories.map((category) => (
          <List component="div" disablePadding key={category._id}>
            <ListItem
              button
              selected={selected === 2}
              className={classes.nested}
              onClick={() => changeCategory(category._id)}
            >
              <ListItemAvatar>
                <Avatar src={category.imageUrl} alt={category.code} />
              </ListItemAvatar>
              <ListItemText primary={category.name} />
            </ListItem>
          </List>
        ))}
      </Collapse>
    </List>
  );
};

const ShopMain = ({ component: Component, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Component {...other} />}
    </div>
  );
};

const ShopDetail = ({ _id, name, address }) => {
  const formik = useFormik({
    initialValues: {
      _id,
      name,
      address,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="_id"
        label="Shop ID"
        value={formik.values._id}
        onChange={formik.handleChange}
        disabled
        fullWidth
      />
      <TextField
        name="name"
        label="Shop Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        fullWidth
      />
      <TextField
        name="address"
        label="Shop Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        fullWidth
      />
      <Button variant="outlined" color="primary" fullWidth>
        Change Shop Detail
      </Button>
    </form>
  );
};

const ShopChangeCategory = ({ init, categories }) => {
  return (
    <Formik
      initialValues={{ categories: init }}
      onSubmit={async (values) => {
        console.log(values);
      }}
    >
      {(props) => (
        <Form>
          <List>
            {categories.map((field, index) => (
              <ListItem key={field._id}>
                <Field
                  key={index}
                  type="checkbox"
                  component={CheckboxWithLabel}
                  name="categories"
                  value={field._id}
                  Label={{ label: field.name }}
                />
                <ListItemSecondaryAction>
                  <Avatar src={field.imageUrl} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Button variant="outlined" color="primary" fullWidth>
            Change Shop Categories List
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles((theme) => ({
  Form: {
    padding: theme.spacing(5),
    "& .MuiFormControl-root": {
      marginBottom: theme.spacing(2),
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const mapState = (state) => ({
  shop: state.shop,
});

export default connect(mapState)(Shop);
