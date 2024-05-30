import { Divider } from "@nextui-org/react";
import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import Apod from "../components/Apod";
function HomePage() {
  return (
    <>
      <NavigationBar />

      <main className="sm:w-11/12 mx-auto py-6 flex flex-col gap-10 ">
        <Hero />
        <Divider />
        <Apod />
        <Divider />
        <section className="w-full h-96 bg-[#F6F6FF] rounded-lg"></section>
      </main>
      <div className="w-full bg-black text-white h-48 mt-6">Footer</div>
    </>
  );
}

export default HomePage;
