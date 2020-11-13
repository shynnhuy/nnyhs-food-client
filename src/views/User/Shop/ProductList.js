import React, { useState, useEffect, useCallback } from "react";
import api from "Api";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import useModal from "hooks/useModal";
import { Field, Form, Formik } from "formik";
import FormikField from "components/core/FormikField";
import FormikFileField from "components/core/FormikFileField";
import { CheckboxWithLabel } from "formik-material-ui";
import { serialize } from "object-to-formdata";
import {
  DeleteForeverTwoTone,
  EditAttributesTwoTone,
} from "@material-ui/icons";

const ProductList = ({ category, shop }) => {
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const list = await api.get("/shop/products", {
        params: { category, shop },
      });
      // console.log(list.data);
      setProducts(list.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [category, shop]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleModal = useModal();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() =>
            handleModal(
              <AddProductForm
                category={category}
                shop={shop}
                products={products}
                setProducts={setProducts}
              />
            )
          }
        >
          add product
        </Button>
      </Grid>
      {products.length === 0 ? (
        <h1>Product list is empty</h1>
      ) : (
        products.map((product) => (
          <List style={{ width: "100%" }} key={product._id}>
            <ListItem>
              <ListItemIcon>
                <Avatar src={product.imageUrl}>P</Avatar>
              </ListItemIcon>
              <ListItemText
                primary={product.name}
                secondary={product.description}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit">
                  <EditAttributesTwoTone />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteForeverTwoTone />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        ))
      )}
    </Grid>
  );
};

const AddProductForm = ({ category, shop, products, setProducts }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: "",
        price: 0,
        description: "",
        image: "",
        shipping: false,
      }}
      onSubmit={async (values) => {
        const newProduct = { ...values, category, shop };
        const formData = serialize(newProduct);
        // console.log(formData);
        try {
          const resp = await api.post("/product/create", formData);
          // console.log({ ...resp });
          setProducts([...products, { ...resp.data.result }]);
        } catch (error) {
          console.log(error.message);
        }
      }}
    >
      {(props) => (
        <Form className={classes.Form}>
          <Image name="image" />
          <FormikField name="name" label="Product name" />
          <FormikField name="price" label="Product price" type="number" />
          <FormikField
            name="description"
            label="Product description"
            multiline
            rows={4}
          />
          <Field
            type="checkbox"
            component={CheckboxWithLabel}
            name={"shipping"}
            Label={{ label: "Shipping" }}
          />
          <Button fullWidth variant="contained" onClick={props.handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const Image = ({ name }) => {
  const [hover, setHover] = useState(false);
  const [previewSource, setPreviewSource] = useState("");
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const classes = useStyles({ previewSource });
  return (
    <div
      className={classes.imageContainer}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className={hover ? classes.ImageOver : classes.Image} />
      <FormikFileField
        name={name}
        label="Image"
        previewFile={previewFile}
        className={hover ? classes.ChangeImageShow : classes.ChangeImageHide}
      />
    </div>
  );
};

export default ProductList;

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "150px",
    height: "150px",
    position: "relative",
  },
  Form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: "100%",
    height: "100%",
    backgroundImage: (props) =>
      props.previewSource
        ? `url(${props.previewSource})`
        : "url(https://static.vecteezy.com/system/resources/thumbnails/000/223/249/original/ketogenic-diet-food-vector.jpg)",
    backgroundSize: "cover",
    borderRadius: "50%",
  },
  ImageOver: {
    width: "100%",
    height: "100%",
    backgroundImage: (props) =>
      props.previewSource
        ? `url(${props.previewSource})`
        : "url(https://static.vecteezy.com/system/resources/thumbnails/000/223/249/original/ketogenic-diet-food-vector.jpg)",
    backgroundSize: "cover",
    borderRadius: "50%",
    opacity: "0.7",
  },
  ChangeImageBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: "none",
  },
  ChangeImageShow: {
    position: "absolute",
    display: "block",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  ChangeImageHide: {
    position: "absolute",
    display: "none",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));
