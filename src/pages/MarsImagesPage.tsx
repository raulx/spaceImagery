/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  Divider,
  Button,
  Image,
  Spinner,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Pagination,
} from "@nextui-org/react";

import { handleOpenFullImage } from "../utils/functions";

import { FaCircleInfo } from "react-icons/fa6";
import Footer from "../components/Footer";
import { GiExpand } from "react-icons/gi";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import MarsImagesSelectBox from "../components/MarsImagesSelectBox";

function MarsImagesPage() {
  const [cameraType, setCameraType] = useState<string>("ALL");
  const [showAll, setShowAll] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const { data, isLoading, isError } = useSelector((state: RootState) => {
    return state.marsImages;
  });

  let render;

  const filteredData = data.photos.filter((d) => {
    if (showAll || cameraType === "ALL") {
      return d;
    } else {
      return d.camera.name === cameraType;
    }
  });

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
        {filteredData.map((d) => {
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

  return (
    <>
      <NavigationBar />
      <MarsImagesSelectBox
        showAll={showAll}
        currentPage={currentPage}
        setShowAll={setShowAll}
        setCameraType={setCameraType}
        setTotalPages={setTotalPages}
        setTotalPhotos={setTotalPhotos}
        setCurrentPage={setCurrentPage}
      />
      <Divider className="my-6" />
      <h1 className="text-center sm:my-6 my-4 font-bold uppercase sm:text-xl font-KronaOne">
        Total Photos:{totalPhotos}
      </h1>
      {!isError && (
        <div className="w-full flex justify-center items-center my-10">
          <Pagination
            color="secondary"
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            showControls
            loop
          />
        </div>
      )}
      <div className="min-h-96">{render}</div>
      <Footer />
    </>
  );
}

export default MarsImagesPage;
