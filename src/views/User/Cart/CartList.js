import React from "react";
import {
  Button,
  ButtonGroup,
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import {
  StyledClearButton,
  StyledImageContainer,
  StyledTableCellImage,
  StyledTableTextBold,
} from "./styles";

const CartList = ({ items, count, changeQuantity }) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {count > 0 && items ? (
            items.map((item, key) => (
              <CartItem key={key} item={item} changeQuantity={changeQuantity} />
            ))
          ) : (
            <TableRow>
              <TableCell align="center">
                <StyledTableTextBold>
                  Your shopping cart is empty!
                </StyledTableTextBold>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CartItem = ({ item, changeQuantity }) => {
  const { name, price, quantity, imageUrl } = item;
  return (
    <TableRow>
      <StyledTableCellImage>
        <StyledImageContainer imageUrl={imageUrl} />
      </StyledTableCellImage>
      <TableCell>
        <StyledTableTextBold>{name}</StyledTableTextBold>
      </TableCell>
      <Hidden only={["xs", "sm", "md"]}>
        <TableCell>
          <ButtonGroup>
            <Button onClick={() => changeQuantity(item, -1)}>
              <i className="fad fa-minus"></i>
            </Button>
            <Button disabled>
              <StyledTableTextBold>{quantity}</StyledTableTextBold>
            </Button>
            <Button onClick={() => changeQuantity(item, 1)}>
              <i className="fad fa-plus"></i>
            </Button>
          </ButtonGroup>
        </TableCell>
        <TableCell>
          <StyledTableTextBold>{price}đ</StyledTableTextBold>
        </TableCell>
        <TableCell>
          <StyledTableTextBold>{price * quantity}đ</StyledTableTextBold>
        </TableCell>
      </Hidden>
      <Hidden only={["lg", "xl"]}>
        <TableCell>
          {quantity} * {price}đ
        </TableCell>
      </Hidden>
      <TableCell>
        <StyledClearButton onClick={() => changeQuantity(item, 0)}>
          <i className="fad fa-times"></i>
        </StyledClearButton>
      </TableCell>
    </TableRow>
  );
};

export default CartList;
