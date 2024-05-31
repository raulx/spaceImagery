// Apod(astronomy picture of the day.)
import axios from "axios";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@nextui-org/react";

const apiKey = import.meta.env.VITE_API_KEY;

function Apod() {
  const [apodData, setApodData] = useState({
    data: { url: "", title: "", explanation: "", date: "" },
    isLoading: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setApodData((prevValue) => {
          return { ...prevValue, isLoading: true };
        });

        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );

        setApodData((prevValue) => {
          return { ...prevValue, isLoading: false, data: response.data };
        });
      } catch (err) {
        navigate("/error", { state: { errorMessage: err.message } });
      }
    };
    getData();
  }, [navigate]);

  let content;

  if (apodData.isLoading) {
    content = (
      <Skeleton>
        <div className="h-96 w-full bg-blue-100"></div>
      </Skeleton>
    );
  } else if (apodData.data) {
    content = (
      <section className="w-full min-h-96  bg-[#353564] rounded-lg grid sm:grid-cols-2 grid-cols-1">
        <div className="col-span-1  ">
          <Image src={apodData.data.url} />
        </div>
        <div className="col-span-1 text-white p-4">
          <div>
            <h1>{apodData.data.title}</h1>
            <p>{apodData.data.explanation}</p>
            <p>{apodData.data.date}</p>
          </div>
        </div>
      </section>
    );
  }

  return <>{content}</>;
}

export default Apod;
