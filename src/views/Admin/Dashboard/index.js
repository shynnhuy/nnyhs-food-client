import { Grid } from "@material-ui/core";
import AdminCard from "components/Manager/Card";
import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getAllUsers, getShops } from "redux/admin/admin.actions";
import { selectUsersList, selectShopsList } from "redux/admin/admin.selectors";
import { createStructuredSelector } from "reselect";

export function Dashboard({ users, shops, getAllUsers, getShops }) {
  useEffect(() => {
    users?.length < 1 && getAllUsers();
    shops?.length < 1 && getShops();
  }, [users, shops, getAllUsers, getShops]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <AdminCard title="Total Users" />
      </Grid>
      <Grid item xs={3}>
        <AdminCard title="Total Shops" />
      </Grid>
      <Grid item xs={3}>
        <AdminCard title="Total Categories" />
      </Grid>
      <Grid item xs={3}>
        <AdminCard />
      </Grid>
    </Grid>
  );
}

const mapState = createStructuredSelector({
  users: selectUsersList,
  shops: selectShopsList,
});

const mapDispatch = {
  getAllUsers,
  getShops,
};

export default connect(mapState, mapDispatch)(Dashboard);
