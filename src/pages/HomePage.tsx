import { Button, Divider } from "@nextui-org/react";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";

import Slider from "react-slick";

function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  // const videoLink =
  //   "https://images-assets.nasa.gov/video/T803303_A_AS-503-APOLLO-8-CREW-DEPARTING-MSOB-ENROUTE-TO-PAD-39A/T803303_A_AS-503-APOLLO-8-CREW-DEPARTING-MSOB-ENROUTE-TO-PAD-39A~preview.mp4";
  const slidesData = [
    {
      id: 1,
      title: "Slide 1",
      content: "This is the content for slide 1",
      imageUrl:
        "https://res.cloudinary.com/dj5yf27lr/image/upload/v1716913168/spaceImagery/iycnfg91524h1uekmvr5.jpg",
      imageUrlPhone:
        "https://res.cloudinary.com/dj5yf27lr/image/upload/v1716915679/spaceImagery/mobileScreen/n8kcm8dvyu2dzayndvzq.jpg",
    },
    {
      id: 2,
      title: "Slide 2",
      content: "This is the content for slide 2",
      imageUrl:
        "https://res.cloudinary.com/dj5yf27lr/image/upload/v1716913168/spaceImagery/vx3yj3leseopshszhkfb.jpg",
      imageUrlPhone:
        "https://res.cloudinary.com/dj5yf27lr/image/upload/v1716915679/spaceImagery/mobileScreen/k2dxglblpjfkytx9nnmt.jpg",
    },
    {
      id: 3,
      title: "Slide 3",
      content: "This is the content for slide 3",
      imageUrl:
        "https://res.cloudinary.com/dj5yf27lr/image/upload/v1716913168/spaceImagery/zsfvkeueugpl9lvvhism.jpg",
      imageUrlPhone:
        "https://res.cloudinary.com/dj5yf27lr/image/upload/v1716915680/spaceImagery/mobileScreen/jiihxc01o0ubragzdpef.jpg",
    },
    {
      id: 4,
      title: "Slide 4",
      content: "This is the content for slide 4",
      imageUrl:
        "https://res.cloudinary.com/dj5yf27lr/image/upload/v1716913168/spaceImagery/kxxt2x760nbc6jrpzmpc.jpg",
      imageUrlPhone:
        "https://res.cloudinary.com/dj5yf27lr/image/upload/v1716915679/spaceImagery/mobileScreen/sabznvwp3zbgx7a6uhte.jpg",
    },
  ];
  return (
    <>
      <NavigationBar />

      <main className="sm:w-11/12 mx-auto py-6 flex flex-col gap-10 ">
        <section className="w-full bg-[#F6F6FF] rounded-lg grid sm:grid-cols-2 grid-cols-1 gap-4 min-h-96 shadow">
          <div className="flex flex-col sm:order-1 order-2  py-4 text-center gap-10 justify-center border-r-1">
            <h1 className="font-KneWave sm:text-xl sm:mt-0 mt-4 tracking-widest text-gray-700 font-bold uppercase">
              Explore the space with nasa
            </h1>
            <p className="w-4/5 mx-auto font-bold  text-gray-500 tracking-widest">
              Explore Nasa’s Official Images and Videos Data, collecting on
              different missions, search any topic and get media content .
            </p>
            <Link to={"/gallery"}>
              <Button className="w-1/5 mx-auto  bg-white border font-bold">
                Explore
              </Button>
            </Link>
          </div>
          <div className="w-full sm:order-2 order-1 sm:pt-4 sm:pr-4">
            <Slider {...settings}>
              {slidesData.map((slide) => (
                <Image
                  key={slide.id}
                  src={slide.imageUrl}
                  srcSet={`${slide.imageUrl} 800w,${slide.imageUrlPhone} 600w`}
                  width={800}
                  height={400}
                />
              ))}
            </Slider>
          </div>
        </section>
        <Divider />
        <section className="w-full h-96 bg-[#353564] rounded-lg"></section>
        <Divider />
        <section className="w-full h-96 bg-[#F6F6FF] rounded-lg"></section>
      </main>
      <div className="w-full bg-black text-white h-48 mt-6">Footer</div>
    </>
  );
}

export default HomePage;
