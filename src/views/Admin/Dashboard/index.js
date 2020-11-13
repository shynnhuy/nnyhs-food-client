import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getAllUsers, getShops } from "redux/admin/admin.actions";

export function Dashboard({ admin, getAllUsers, getShops }) {
  useEffect(() => {
    admin.users?.length < 1 && getAllUsers();
    admin.shops?.length < 1 && getShops();
  }, [admin, getAllUsers, getShops]);

  return <div></div>;
}

const mapState = (state) => ({
  admin: state.admin,
});

const mapDispatch = {
  getAllUsers,
  getShops,
};

export default connect(mapState, mapDispatch)(Dashboard);
