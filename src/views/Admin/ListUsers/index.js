import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import ShynnTable from "components/core/ShynnTable";
import { connect } from "react-redux";

export const ListUsers = ({ admin }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Display Name",
        accessor: "displayName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  if (admin.users.length < 1) {
    return <h1>No user in database!</h1>;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <ShynnTable
              sorted
              filter
              data={admin.users}
              columns={columns}
              className="-striped -highlight"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapState = (state) => ({
  admin: state.admin,
});

export default connect(mapState)(ListUsers);
