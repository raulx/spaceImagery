// Apod(astronomy picture of the day.)
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@nextui-org/react";
import {
  AppDispatch,
  RootState,
  fetchApodDataStart,
  fetchApodDataSuccess,
} from "../store/store";

const apiKey = import.meta.env.VITE_API_KEY;

function Apod() {
  const dispatch: AppDispatch = useDispatch();

  const { data, isFetching } = useSelector((state: RootState) => {
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
        if (err instanceof Error) {
          navigate("/error", { state: { errorMessage: err.message } });
        } else {
          navigate("/error", {
            state: { errorMessage: "An Unknown error occured" },
          });
        }
      }
    };
    getData();
  }, [navigate, dispatch]);

  let content;

  const handleOpenFullImage = (url: string) => {
    // Window name and specs (optional)
    const windowName = "_blank"; // '_blank' opens in a new tab/window
    const windowFeatures = "width=800,height=600,resizable,scrollbars";

    // Open a new window
    window.open(url, windowName, windowFeatures);
  };

  if (isFetching) {
    content = (
      <Skeleton>
        <div className="h-96 w-full bg-blue-100"></div>
      </Skeleton>
    );
  } else if (data) {
    content = (
      <section className="w-full min-h-96  bg-[#353564] rounded-lg grid sm:grid-cols-2 grid-cols-1 gap-8 sm:px-4 px-2 py-6">
        <div className="col-span-1 relative">
          <Image src={data.url} />
          <div
            className="h-24 w-24 bg-green-800 z-10 rounded-2xl absolute top-2 right-2"
            onClick={() => handleOpenFullImage(data.hdurl)}
          ></div>
        </div>
        <div className="col-span-1 text-white">
          <div className="flex flex-col gap-4">
            <h1 className="sm:text-2xl text-xl text-center leading-relaxed uppercase font-KronaOne tracking-wide">
              {data.title}
            </h1>
            <p className="tracking-wide text-gray-200 leading-relaxed text-center">
              {data.explanation}
            </p>
            <div className="my-4 flex justify-between px-4">
              <span className="text-sm text-gray-200">Date: {data.date}</span>
              <span className=" font-KneWave text-gray-200">
                &copy; {data.copyright}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    content = null;
  }

  return <>{content}</>;
}

export default Apod;
