import { Divider, Image } from "@nextui-org/react";
import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import Apod from "../components/Apod";
import Footer from "../components/Footer";
import { Button } from "@nextui-org/react";

const marsImages = [
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

function HomePage() {
  return (
    <>
      <NavigationBar />
      <main className="sm:w-11/12 mx-auto py-6 flex flex-col gap-10 ">
        <Hero />
        <Divider />
        <Apod />
        <Divider />
        <section className="w-full bg-[#F6F6FF] flex flex-col rounded-lg p-4">
          <h1 className=" font-KronaOne  text-center my-4 uppercase tracking-wide">
            Explore Mars Rover Images
          </h1>
          <Divider />
          <div className="flex w-full items-center justify-between my-4 flex-wrap  sm:gap-4 gap-8 sm:p-4">
            {marsImages.map((image) => {
              return (
                <Image
                  key={image.id}
                  removeWrapper
                  src={image.url}
                  className="sm:w-[400px] sm:h-[400px] w-[400px] h-[300px] object-cover"
                />
              );
            })}
          </div>
          <Button className="bg-white border font-bold self-center my-4">
            Explore More
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
