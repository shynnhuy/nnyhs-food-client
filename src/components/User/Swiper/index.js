import React from "react";
import { Box, Card, CardMedia, Container, Typography } from "@material-ui/core";
import SwiperCore, { Navigation, A11y, Lazy, Zoom } from "swiper";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/a11y/a11y.scss";
import "swiper/components/lazy/lazy.scss";
import "swiper/components/zoom/zoom.scss";

import useStyles from "./styles";

SwiperCore.use([Navigation, A11y, Lazy, Zoom]);

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
        spaceBetween={35}
        slidesPerView={6}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          960: {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
        }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {list.map((item, key) => (
          <SwiperSlide key={key}>
            <SwiperItem {...item} changeCategory={changeCategory} />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </Box>
  );
};

export default Swiper;

/* <SwiperContainer
  spaceBetween={35}
  slidesPerView={6}
  onInit={(swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }}
  onSlideChange={() => console.log("slide change")}
  onSwiper={(swiper) => console.log(swiper)}
>
  <div ref={prevRef}>Prev</div>
  {list.map((item, key) => (
    <SwiperSlide key={key}>
      <SwiperItem {...item} changeCategory={changeCategory} />
    </SwiperSlide>
  ))}
  <div ref={nextRef}>Next</div>
</SwiperContainer>; */
