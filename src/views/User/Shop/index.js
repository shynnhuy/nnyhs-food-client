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
  const [toggleCategory, settoggleCategory] = useState(0);
  const classes = useStyles();
  const handleToggleProducts = () => setOpen(!open);
  const changeCategory = (code, key) => {
    setCategory(code);
    setSelected(2);
    settoggleCategory(key);
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
        <List component="div" disablePadding>
          {categories.map((category, key) => (
            <ListItem
              button
              selected={toggleCategory === key}
              className={classes.nested}
              onClick={() => changeCategory(category._id, key)}
              key={category._id}
            >
              <ListItemAvatar>
                <Avatar src={category.imageUrl} alt={category.code} />
              </ListItemAvatar>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
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
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      _id,
      name,
      address,
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="_id"
        label="Shop ID"
        value={values._id}
        onChange={handleChange}
        disabled
        fullWidth
      />
      <TextField
        name="name"
        label="Shop Name"
        value={values.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="address"
        label="Shop Address"
        value={values.address}
        onChange={handleChange}
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
