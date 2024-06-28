import { Divider, Image } from "@nextui-org/react";
import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import Apod from "../components/Apod";
import Footer from "../components/Footer";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { marsMockImages } from "../utils/data";

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
            Explore Mars Images
          </h1>
          <Divider />
          <div className="flex w-full items-center justify-between my-4 flex-wrap  sm:gap-4 gap-8 sm:p-4">
            {marsMockImages.map((image) => {
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

          <Button className="bg-white font-bold border-2 rounded-lg sm:w-1/6 w-1/3 mx-auto">
            <Link to={"/mars"}>Explore More</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
