import {
  Spinner,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Image,
} from "@nextui-org/react";
import { FaCircleInfo } from "react-icons/fa6";
import { GiExpand } from "react-icons/gi";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { handleOpenFullImage } from "../utils/functions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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
            <div key={d.id} className="hover:cursor-zoom-in relative">
              <TransformWrapper>
                <TransformComponent>
                  <Image
                    removeWrapper
                    loading="lazy"
                    className="w-[400px] h-[400px] bg-black object-contain"
                    src={d.img_src}
                  />
                </TransformComponent>
              </TransformWrapper>
              <div className="flex justify-between items-center w-24 h-12  absolute right-6 top-1">
                <div>
                  <Popover placement="top">
                    <PopoverTrigger>
                      <Button className="bg-transparent" size="sm">
                        <FaCircleInfo className="text-white text-xl" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="w-48 p-4 flex flex-col gap-2 text-gray-600">
                        <p>Rover: {d.rover.name}</p>

                        <p>Id: {d.id}</p>
                        <p>Sol: {d.sol}</p>
                        <p>Earth Date: {d.earth_date}</p>
                        <p>Camera: {d.camera.name}</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Button
                    isIconOnly
                    onPress={() => handleOpenFullImage(d.img_src)}
                  >
                    <GiExpand />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return <div className="min-h-96">{render}</div>;
}

export default MarsImagesBox;
