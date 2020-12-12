import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import React from "react";

const Review = ({ items, total }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem style={{ padding: "10px 0" }} key={item._id}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant="body2">
              {item.price * item.quantity || 0}đ
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary={"Total"} />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {total || 0}đ
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
