import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const BottomSlide = ({ data}) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Container>
      <Slider {...settings}>
        {data.map((v) => {
          return <Image key={v} src={v} ></Image>;
        })}
      </Slider>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg);
  background-size: cover ;
  background-position: center 30%;
  /* display: flex;
  flex-direction: column; */
  /* justify-content: center;
  align-items: center; */
`;
const Image = styled.img`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  /* background-size: cover; */
`;
export default BottomSlide;
