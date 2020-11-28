import { Grid } from "@material-ui/core";
import AdminCard from "components/Manager/Card";
import React, { useEffect } from "react";
import { Users, ShoppingBag, Archive } from "react-feather";
import { connect } from "react-redux";
import { getAllUsers, getShops } from "redux/admin/admin.actions";
import {
  selectUsersList,
  selectShopsList,
  selectCategoriesList,
} from "redux/admin/admin.selectors";
import { createStructuredSelector } from "reselect";

export function Dashboard({ users, shops, categories, getAllUsers, getShops }) {
  useEffect(() => {
    users?.length < 1 && getAllUsers();
    shops?.length < 1 && getShops();
  }, [users, shops, getAllUsers, getShops]);

  return (
    <Grid container spacing={4}>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <AdminCard
          title="Total Users"
          primary={users.length}
          icon={Users}
          color="red"
        />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <AdminCard
          title="Total Shops"
          primary={shops.length}
          icon={ShoppingBag}
          color="green"
        />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <AdminCard
          title="Total Categories"
          primary={categories.length}
          icon={Archive}
          color="yellow"
        />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <AdminCard primary={0} color="blue" />
      </Grid>
    </Grid>
  );
}

const mapState = createStructuredSelector({
  users: selectUsersList,
  shops: selectShopsList,
  categories: selectCategoriesList,
});

const mapDispatch = {
  getAllUsers,
  getShops,
};

export default connect(mapState, mapDispatch)(Dashboard);
