import { Button, Divider } from "@nextui-org/react";
import NavigationBar from "../components/NavigationBar";
import { Image } from "@nextui-org/react";

function HomePage() {
  return (
    <>
      <NavigationBar />

      <main className="sm:w-11/12 mx-auto py-10 flex flex-col gap-10 ">
        <section className="w-full bg-[#F6F6FF] rounded-lg grid sm:grid-cols-2 grid-cols-1 gap-4 g min-h-96 shadow">
          <div className="flex flex-col sm:order-1 order-2  py-4 text-center gap-10 justify-center">
            <h1 className="font-KneWave text-2xl tracking-widest text-gray-700 font-bold uppercase">
              Explore the space with nasa
            </h1>
            <p className="w-4/5 mx-auto font-bold text-lg text-gray-500 tracking-widest">
              Explore Nasa’s Official Images and Videos Data, collecting on
              different missions, search any topic and get media content .
            </p>
            <Button className="w-1/5 mx-auto  bg-white border font-bold">
              Explore
            </Button>
          </div>
          <div className="flex justify-center items-center sm:order-2 order-1">
            <div className="flex justify-center  bg-gray-300 items-center">
              <Image
                src="https://picsum.photos/400/300"
                width={400}
                height={300}
              />
            </div>
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
