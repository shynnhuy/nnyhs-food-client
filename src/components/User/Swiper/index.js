import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import SwiperCore, { Navigation } from "swiper";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import useStyles from "./styles";

SwiperCore.use([Navigation]);

const SwiperItem = ({ _id, name, imageUrl, changeCategory }) => {
  const classes = useStyles();
  return (
    <Card className={classes.Card} onClick={() => changeCategory(_id, name)}>
      <Typography variant="body1" className={classes.Title}>
        {name}
      </Typography>
      <CardMedia className={classes.cover} image={imageUrl} title={name} />
    </Card>
  );
};

export const Swiper = ({ categories, changeCategory }) => {
  const classes = useStyles();

  if (!categories) {
    return <h2>Loading...</h2>;
  }

  let list = [
    {
      _id: "all",
      name: "All Products",
      imageUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/000/430/087/original/Healthy_food_vector-01.jpg",
    },
    ...categories,
  ];

  return (
    <Box component={Container} className={classes.root}>
      <SwiperContainer
        spaceBetween={50}
        slidesPerView={6}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {list.map((item, key) => (
          <SwiperSlide>
            <SwiperItem {...item} changeCategory={changeCategory} />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </Box>
  );
};

export default Swiper;

// const Old = () => {
//   return (
//     <Grid container className={classes.Container} spacing={2}>
//       {categories &&
//         [
//           {
//             _id: "all",
//             name: "All Products",
//             imageUrl:
//               "https://static.vecteezy.com/system/resources/thumbnails/000/430/087/original/Healthy_food_vector-01.jpg",
//           },
//           ...categories,
//         ].map((item, key) => (
//           <Grid key={key} item xs={4} md={2} zeroMinWidth>
//             <SwiperItem {...item} changeCategory={changeCategory} />
//           </Grid>
//         ))}
//     </Grid>
//   );
// };
