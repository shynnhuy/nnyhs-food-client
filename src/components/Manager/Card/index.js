import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: (props) => colors[props.color][600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: (props) => colors[props.color][900],
  },
  differenceValue: {
    color: (props) => colors[props.color][900],
    marginRight: theme.spacing(1),
  },
}));

const AdminCard = ({ className, icon: Icon, ...rest }) => {
  const classes = useStyles({ color: rest.color || "red" });

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {rest.title || "Card"}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {rest.primary || 0}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              {Icon && <Icon size="20" />}
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

AdminCard.propTypes = {
  className: PropTypes.string,
};

export default AdminCard;
