// Apod(astronomy picture of the day.)
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@nextui-org/react";
import { FaExpandAlt } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";
import { handleOpenFullImage } from "../utils/functions";
import {
  AppDispatch,
  RootState,
  fetchApodDataError,
  fetchApodDataStart,
  fetchApodDataSuccess,
} from "../store/store";

const apiKey = import.meta.env.VITE_API_KEY;

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
      <section className="w-full sm:min-h-96 bg-[#353564] rounded-lg grid sm:grid-cols-2 grid-cols-1 gap-8 sm:px-4 px-2 py-6">
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
          <div className="flex flex-col gap-4 h-full justify-evenly">
            <h1 className="sm:text-2xl text-xl text-center leading-relaxed uppercase font-KronaOne tracking-wide">
              {data.title}
            </h1>
            <p className="tracking-wide text-gray-200 leading-relaxed text-center">
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

  return <>{content}</>;
}

export default Apod;
