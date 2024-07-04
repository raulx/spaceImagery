import { Spinner } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ImageCard from "./ImageCard";

function MarsImagesBox() {
  const { data, isLoading, isError, errorMessage } = useSelector(
    (state: RootState) => {
      return state.marsImages;
    }
  );
  let render;

  if (isLoading) {
    render = (
      <div className="w-screen flex justify-center items-center h-[600px]">
        <Spinner size="lg" />
      </div>
    );
  } else if (isError) {
    render = (
      <div
        className="bg-red-100 border border-red-400 mt-6 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {" "}
        <h1 className="text-center text-4xl text-red-400  my-4">Oops !!</h1>
        <p className="text-center my-4">
          <span className="block sm:inline"> {errorMessage}</span>
        </p>
      </div>
    );
  } else {
    render = (
      <div className="flex flex-wrap w-full justify-center sm:gap-12 gap-16 p-4">
        {data.photos.map((d) => {
          return (
            <ImageCard key={d.id} title={d.earth_date} imgLink={d.img_src} />
          );
        })}
      </div>
    );
  }
  return <div className="bg-[#F6F6FF] my-4">{render}</div>;
}

export default MarsImagesBox;
