import { Divider, Image, Skeleton } from "@nextui-org/react";
import NavigationBar from "../components/NavigationBar";
import { apiKey, slidesData } from "../utils/variables";
import Footer from "../components/Footer";
import { Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { marsMockImages } from "../utils/variables";
import {
  AppDispatch,
  fetchApodDataError,
  fetchApodDataStart,
  fetchApodDataSuccess,
  RootState,
} from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { handleOpenFullImage } from "../utils/functions";
import { FaExpandAlt } from "react-icons/fa";
import { sliderSetting } from "../utils/variables";
import axios from "axios";

function Apod() {
  const dispatch: AppDispatch = useDispatch();

  const { data, isFetching, isError } = useSelector((state: RootState) => {
    return state.apod;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(fetchApodDataStart());
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );
        dispatch(fetchApodDataSuccess(response.data));
      } catch (err: unknown) {
        dispatch(fetchApodDataError());
      }
    };
    getData();
  }, [navigate, dispatch]);

  let content;

  if (isFetching) {
    content = (
      <div className="sm:h-[480px] h-[800px] w-full flex sm:flex-row  flex-col gap-8 rounded-lg border-2 sm:px-4 px-2 py-6">
        <Skeleton className="sm:w-1/2 sm:h-full h-1/2 w-full rounded-lg"></Skeleton>
        <div className="sm:w-1/2 sm:h-full h-1/2 w-full rounded-lg flex flex-col justify-between gap-4 items-center">
          <Skeleton className="rounded-3xl h-1/6 w-full"></Skeleton>
          <Skeleton className="rounded-3xl h-4/6 w-full"></Skeleton>
          <Skeleton className="rounded-3xl h-1/6 w-full"></Skeleton>
        </div>
      </div>
    );
  } else if (isError) {
    content = null;
  } else if (data) {
    content = (
      <section className="w-full sm:min-h-96 bg-[#353564] rounded-lg grid sm:grid-cols-2 grid-cols-1 gap-8 sm:px-4 px-2 py-6 shadow-lg">
        <div className="col-span-1 relative ">
          {data.media_type === "video" ? (
            <div className="w-full mx-auto h-96 sm:h-auto">
              <ReactPlayer
                url={data.url}
                controls={true}
                className="absolute top-0 left-0"
                height="100%"
                width="100%"
              />
            </div>
          ) : (
            <>
              <Image src={data.url} />
              <Button
                isIconOnly
                className="z-10 absolute top-2 right-2 opacity-50"
                onPress={() => handleOpenFullImage(data.hdurl)}
              >
                <FaExpandAlt />
              </Button>
            </>
          )}
        </div>
        <div className="col-span-1 text-white">
          <div className="flex flex-col gap-4 mt-10">
            <h1 className="leading-relaxed  font-KronaOne tracking-wide">
              {data.title}
            </h1>
            <p className="tracking-wide text-gray-200 leading-relaxed ">
              {data.explanation}
            </p>
            <div className="my-4 flex justify-between px-4">
              <span className="text-sm text-gray-200">Date: {data.date}</span>
              {data.copyright && (
                <span className=" font-KneWave text-gray-200">
                  &copy; {data.copyright}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <h1 className="text-white font-KronaOne uppercase leading-relaxed tracking-wide sm:text-xl sm:w-2/3 w-full text-xs text-center shadow-lg mx-auto bg-[#353564] p-2 rounded-full">
        Astronomy Picture of the day.(APOD)
      </h1>
      {content}
    </>
  );
}

function HomePage() {
  return (
    <>
      <NavigationBar />

      <main className="sm:w-11/12 mx-auto py-6 flex flex-col gap-6 ">
        {/* Hero section  */}
        <section className="w-full bg-[#F6F6FF] rounded-lg grid sm:grid-cols-2 grid-cols-1 gap-4 min-h-96 shadow-lg">
          <div className="flex flex-col sm:order-1 order-2  py-4 text-center gap-10 justify-center border-r-1">
            <h1 className="font-KronaOne sm:text-xl sm:mt-0 mt-4 tracking-widest text-gray-700 font-bold uppercase">
              Explore the space with nasa
            </h1>
            <p className="w-4/5 mx-auto font-bold  text-gray-500 tracking-widest">
              Explore Nasa’s Official Images and Videos Data, collecting on
              different missions, search any topic and get media content .
            </p>

            <Button className="sm:w-1/5 mx-auto  bg-white border font-bold btn-gradient text-white py-2 px-4 rounded-full transition duration-300">
              <Link to={"/gallery"}>Explore</Link>
            </Button>
          </div>
          <div className="w-full sm:order-2 order-1 sm:pt-4 p-2 sm:pr-4">
            <Slider {...sliderSetting}>
              {slidesData.map((slide) => (
                <Image
                  key={slide.id}
                  src={slide.imageUrl}
                  srcSet={`${slide.imageUrl} 1600w,${slide.imageUrlPhone} 800w`}
                  width={800}
                  height={400}
                />
              ))}
            </Slider>
          </div>
        </section>

        <Divider />

        {/* Astronomy picture of the day  */}
        <Apod />

        <Divider />

        {/* features section */}
        <section className="w-full bg-[#F6F6FF] flex flex-col rounded-lg p-4 shadow-lg">
          <h1 className=" font-KronaOne  text-center my-4 uppercase tracking-wide ">
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

          <Button className="bg-white font-bold border-2 rounded-full sm:w-1/6 w-1/3 mx-auto btn-gradient text-white  py-2 px-4  transition duration-300">
            <Link to={"/mars"}>Explore More</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
