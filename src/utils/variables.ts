export const marsRoverCameras: string[] = [
  "ALL",
  "FHAZ",
  "RHAZ",
  "MAST",
  "CHEMCAM",
  "MAHLI",
  "MARDI",
  "NAVCAM",
];

export const marsMockImages: { id: number; url: string }[] = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231167/spaceImagery/MarsImages/ohswszwf7yts1u4kdrpb.png",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231167/spaceImagery/MarsImages/v2tl5r2fv7zsijhtxsax.png",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231167/spaceImagery/MarsImages/ljylsikzp5ncqq13zszc.png",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231166/spaceImagery/MarsImages/a9cfcb9izfjbywvr1cv8.png",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231165/spaceImagery/MarsImages/vnxfzljqxvkmzy0zjgju.png",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231164/spaceImagery/MarsImages/vhpofnvdzelswvgxdemh.png",
  },
];

export const slidesData = [
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

export const typesOfMedia: { key: string; value: string }[] = [
  { key: "All", value: "All" },
  { key: "image", value: "Image" },
  { key: "video", value: "Video" },
  { key: "audio", value: "Audio" },
];

export const apiKey = import.meta.env.VITE_API_KEY;

export const sliderSetting = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};
