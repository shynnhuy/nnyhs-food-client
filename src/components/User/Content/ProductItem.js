import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";

import useStyles, {
  StyledCard,
  StyledCardImage,
  StyledCardTitle,
  StyledCardFooter,
  StyledCardDescription,
  StyledBadge,
} from "./styles";
import { Rating } from "@material-ui/lab";
import { AddShoppingCartTwoTone, StarBorderTwoTone } from "@material-ui/icons";
import { connect } from "react-redux";
import { addItem } from "redux/cart/cart.actions";
import { selectSingleCartItemQuantity } from "redux/cart/cart.selectors";
import { useHistory } from "react-router-dom";

const ProductItem = ({ product, addItem, inCart }) => {
  const classes = useStyles();
  const history = useHistory();
  const toProductDetails = () => {
    history.push("/products/" + product._id);
  };
  return (
    <StyledBadge
      classes={{ badge: classes.badge }}
      color="secondary"
      badgeContent={inCart?.quantity}
    >
      <StyledCard>
        <div onClick={toProductDetails}>
          <StyledCardImage image={product.imageUrl} />
          <StyledCardTitle>{product.name}</StyledCardTitle>
          <StyledCardDescription>{product.shop.address}</StyledCardDescription>
          <span>{product.price}đ</span>
        </div>
        <StyledCardFooter>
          <Rating
            name={`${product.code}-${product._id}`}
            defaultValue={0}
            precision={0.5}
            emptyIcon={<StarBorderTwoTone className={classes.blankStar} />}
          />
          <Tooltip
            arrow
            title={`Add [${product.name}] to card`}
            placement="left"
          >
            <IconButton color="primary" onClick={() => addItem(product)}>
              <AddShoppingCartTwoTone />
            </IconButton>
          </Tooltip>
        </StyledCardFooter>
      </StyledCard>
    </StyledBadge>
  );
};

// const mapState = (state, props) => ({
//   quantity: selectCartItems(state).find(
//     (item) => item._id === props.product._id
//   ).quantity,
// });
const mapState = (state, props) => ({
  inCart: selectSingleCartItemQuantity(state, props),
});

export default connect(mapState, { addItem })(ProductItem);
