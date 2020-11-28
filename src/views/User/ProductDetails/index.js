import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button as MatButton,
  ButtonGroup,
  useTheme,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {
  StarBorderTwoTone as StarBlank,
  StarTwoTone as Star,
} from "@material-ui/icons";
import { ShoppingCart, Tag } from "react-feather";
import { connect } from "react-redux";
import { addItems } from "redux/cart/cart.actions";
// import { productDetailsSelector } from "redux/product/product.selectors";

import useStyles, {
  ProductName,
  ProductDescription,
  StyledButton,
  PriceContainer,
  Price,
} from "./styles";
import Commitments from "components/User/Commitments";
import productApi from "api/productApi";

const ProductDetails = ({ match, addItems }) => {
  const theme = useTheme();
  const {id} = match.params;
  const [num, setNum] = useState(1);
  const [isDisable, setIsDisable] = useState(false);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles({ image: product.imageUrl });
  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const res = await productApi.getProducts({ id });
        setProduct(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id]);
  const increase = () => setNum(num + 1);
  const decrease = () => {
    if (num === 1) {
      setIsDisable(true);
      return;
    }
    setNum(num - 1);
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    product && (
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item sm={12} md={5} classes={{ item: classes.ImgContainer }}>
            <div className={classes.image}></div>
          </Grid>
          <Grid item sm={12} md={7}>
            <ProductName>{product.name || "Product"} Details</ProductName>
            <Rating
              className={classes.rating}
              name={`${product.code}-${product._id}`}
              defaultValue={0}
              precision={0.5}
              icon={<Star fontSize="inherit" />}
              emptyIcon={<StarBlank fontSize="inherit" />}
            />
            <h3>
              <strong>Category:</strong> {product.category?.name}
            </h3>
            <ProductDescription>{product.description}</ProductDescription>
            <div className={classes.divider} />
            <PriceContainer>
              <Tag color={theme.palette.primary.main} />
              <Price color={theme.palette.primary.main}>
                {product.price * num}đ
              </Price>
            </PriceContainer>
            <ButtonGroup color="primary">
              <MatButton onClick={decrease} disabled={isDisable || num === 1}>
                <i className="fad fa-chevron-left"></i>
              </MatButton>
              <MatButton disabled>{num}</MatButton>
              <MatButton onClick={increase}>
                <i className="fad fa-chevron-right"></i>
              </MatButton>
            </ButtonGroup>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<ShoppingCart />}
              onClick={() => addItems(product, num)}
            >
              ADD TO CART
            </StyledButton>
            <Commitments />
          </Grid>
        </Grid>
      </Container>
    )
  );
};

// const mapState = (state, props) => ({
//   details: productDetailsSelector(state, props.match.params.id),
// });

const mapDispatch = {
  addItems,
};

export default connect(null, mapDispatch)(ProductDetails);
