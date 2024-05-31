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

  if (isFetching) {
    content = (
      <Skeleton>
        <div className="h-96 w-full bg-blue-100"></div>
      </Skeleton>
    );
  } else if (data) {
    content = (
      <section className="w-full min-h-96  bg-[#353564] rounded-lg grid sm:grid-cols-2 grid-cols-1">
        <div className="col-span-1  ">
          <Image src={data.url} />
        </div>
        <div className="col-span-1 text-white p-4">
          <div>
            <h1>{data.title}</h1>
            <p>{data.explanation}</p>
            <p>{data.date}</p>
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
