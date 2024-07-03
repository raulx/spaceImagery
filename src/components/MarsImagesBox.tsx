import { Spinner } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ImageCard from "./ImageCard";

function MarsImagesBox() {
  const { data, isLoading, isError } = useSelector((state: RootState) => {
    return state.marsImages;
  });
  let render;

  if (isLoading) {
    render = (
      <div className="w-screen flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  } else if (isError) {
    render = (
      <div className="w-48 h-48 bg-red-600 text-white mx-auto p-6 rounded-lg">
        No Data found
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
  return <div className="min-h-[600px] bg-[#F6F6FF] my-4">{render}</div>;
}

export default MarsImagesBox;
