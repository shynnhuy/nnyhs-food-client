import { Grid } from "@material-ui/core";
import AdminCard from "components/Manager/Card";
import React, { useEffect } from "react";

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
      <Grid item xs={3}>
        <AdminCard title="Total Users" primary={users.length} />
      </Grid>
      <Grid item xs={3}>
        <AdminCard title="Total Shops" primary={shops.length} />
      </Grid>
      <Grid item xs={3}>
        <AdminCard title="Total Categories" primary={categories.length} />
      </Grid>
      <Grid item xs={3}>
        <AdminCard primary={0} />
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
