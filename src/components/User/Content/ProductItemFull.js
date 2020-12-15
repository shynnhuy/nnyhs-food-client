import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { Rating } from "@material-ui/lab";
import {
  AddShoppingCartTwoTone,
  InfoTwoTone,
  StarBorderTwoTone,
} from "@material-ui/icons";
import { connect } from "react-redux";
import { addItem } from "redux/cart/cart.actions";
import { selectSingleCartItemQuantity } from "redux/cart/cart.selectors";
import { useHistory } from "react-router-dom";
import { selectProductCategory } from "redux/product/product.selectors";
import { IconButton, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 256,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  action: {
    marginLeft: "auto",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

function ProductItemFull({ product, category, addItem, inCart }) {
  const classes = useStyles();
  const history = useHistory();
  const toProductDetails = () => {
    history.push("/products/" + product._id);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={product.imageUrl}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {category}
          </Typography>
          <Typography component="h6">
            <b>{product.price}đ</b>
          </Typography>
          <Typography component="p" variant="body2">
            {product.description}
          </Typography>
          <Rating
            name={`${product.code}-${product._id}`}
            defaultValue={0}
            precision={0.5}
            emptyIcon={<StarBorderTwoTone className={classes.blankStar} />}
          />
        </CardContent>
      </div>
      <div className={classes.action}>
        <Tooltip arrow title={`See [${product.name}] details`} placement="left">
          <IconButton color="primary" onClick={toProductDetails}>
            <InfoTwoTone />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={`Add [${product.name}] to card`} placement="left">
          <IconButton color="primary" onClick={() => addItem(product)}>
            <AddShoppingCartTwoTone />
          </IconButton>
        </Tooltip>
      </div>
    </Card>
  );
}

const mapState = (state, props) => ({
  inCart: selectSingleCartItemQuantity(state, props),
  category: selectProductCategory(state, props),
});

export default connect(mapState, { addItem })(ProductItemFull);
