import { Divider, Image } from "@nextui-org/react";
import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import Apod from "../components/Apod";
import { Button } from "@nextui-org/react";
function HomePage() {
  return (
    <>
      <NavigationBar />

      <main className="sm:w-11/12 mx-auto py-6 flex flex-col gap-10 ">
        <Hero />
        <Divider />
        <Apod />
        <Divider />
        <section className="w-full  bg-[#F6F6FF] rounded-lg p-4">
          <h1 className=" font-KronaOne  text-center my-4 uppercase tracking-wide">
            Explore Mars Rover Images
          </h1>
          <Divider />
          <div className="flex w-full items-center justify-between my-4 flex-wrap  gap-4 sm:p-4">
            <Image
              src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231167/spaceImagery/MarsImages/ohswszwf7yts1u4kdrpb.png"
              width={400}
              height={400}
            />
            <Image
              src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231167/spaceImagery/MarsImages/v2tl5r2fv7zsijhtxsax.png"
              width={400}
              height={400}
            />
            <Image
              src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231167/spaceImagery/MarsImages/ljylsikzp5ncqq13zszc.png"
              width={400}
              height={400}
            />
            <Image
              src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231166/spaceImagery/MarsImages/a9cfcb9izfjbywvr1cv8.png"
              width={400}
              height={400}
            />
            <Image
              src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231165/spaceImagery/MarsImages/vnxfzljqxvkmzy0zjgju.png"
              width={400}
              height={400}
            />
            <Image
              src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231164/spaceImagery/MarsImages/vhpofnvdzelswvgxdemh.png"
              width={400}
              height={400}
            />

            {/* <img src="https://picsum.photos/200/300" />
            <img src="https://picsum.photos/200/300" />
            <img src="https://picsum.photos/200/300" />
            <img src="https://picsum.photos/200/300" /> */}
          </div>
          <Button className=" bg-white border font-bold">Explore More</Button>
        </section>
      </main>
      <div className="w-full bg-black text-white h-48 mt-6">Footer</div>
    </>
  );
}

export default HomePage;
