import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import { ChevronRight } from "react-feather";
import useStyles from "./styles";

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="section" className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <FooterCard title="About Us">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                inventore cupiditate ducimus excepturi blanditiis illo? Officia,
                quidem! Tempora, blanditiis iusto? Ut tempore laborum accusamus
                minima rerum soluta laboriosam explicabo quas!
              </p>
            </FooterCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <FooterCard title="Works">
              <List>
                {["About Us", "Services", "Shop", "Foods", "Drinks"].map(
                  (item) => (
                    <ListItem disableGutters button key={item}>
                      <ListItemIcon className={classes.icon}>
                        <ChevronRight color="white" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  )
                )}
              </List>
            </FooterCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <FooterCard title="Ipsum">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                inventore cupiditate ducimus excepturi blanditiis illo? Officia,
                quidem! Tempora, blanditiis iusto? Ut tempore laborum accusamus
                minima rerum soluta laboriosam explicabo quas!
              </p>
            </FooterCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <FooterCard title="Lorem">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                inventore cupiditate ducimus excepturi blanditiis illo? Officia,
                quidem! Tempora, blanditiis iusto? Ut tempore laborum accusamus
                minima rerum soluta laboriosam explicabo quas!
              </p>
            </FooterCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

const FooterCard = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      {children}
    </div>
  );
};
