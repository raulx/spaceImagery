/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  Card,
  CardBody,
  Divider,
  Button,
  Image,
  Input,
  Spinner,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  Radio,
  Switch,
  Pagination,
} from "@nextui-org/react";

import { handleOpenFullImage } from "../utils/functions";

import axios from "axios";
import { FaQuestion, FaCircleInfo } from "react-icons/fa6";
import Footer from "../components/Footer";
import { GiExpand } from "react-icons/gi";
import { Select, SelectItem } from "@nextui-org/react";
import {
  AppDispatch,
  RootState,
  fetchMarsImageDataStart,
  fetchMarsImageDataError,
  fetchMarsImageDataSuccess,
} from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const apiKey = import.meta.env.VITE_API_KEY;

function MarsImagesPage() {
  const [roverType, setRoverType] = useState<string>("curiosity");
  const [cameraType, setCameraType] = useState<string>("ALL");
  const [isLatest, setIslatest] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state: RootState) => {
    return state.marsImages;
  });
  // const [data, setData] = useState({
  //   data: {
  //     photos: [
  //       {
  //         img_src: "",
  //         id: "",
  //         sol: "",
  //         earth_date: "",
  //         camera: { name: "" },
  //         rover: {
  //           name: "",
  //           landing_date: "",
  //           launch_date: "",
  //           status: "",
  //           max_sol: "",
  //           max_date: "",
  //           total_photos: "",
  //           cameras: [{ name: "", full_name: "" }],
  //         },
  //       },
  //     ],
  //   },
  //   isLoading: false,
  //   isError: false,
  // });

  const [sol, setSol] = useState<string>("1");

  useEffect(() => {
    const fetchData = async () => {
      let requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?api_key=${apiKey}&sol=${sol}&page=1`;
      let metaUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?api_key=${apiKey}&sol=${sol}`;
      if (isLatest) {
        requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/latest_photos?api_key=${apiKey}&page=1`;
        metaUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/latest_photos?api_key=${apiKey}`;
      }
      try {
        // setData((prevValue) => {
        //   return { ...prevValue, isLoading: true };
        // });

        dispatch(fetchMarsImageDataStart());
        const metaData = await axios.get(metaUrl);

        if (metaData.data) {
          const totalPhotos =
            metaData.data.photos?.length ||
            metaData.data.latest_photos?.length ||
            0;
          setTotalPhotos(totalPhotos);
          const totalPages = Math.floor(totalPhotos / 25 + 1);
          setTotalPages(totalPages);
        }
        const res = await axios.get(requestUrl);
        let photos;

        if (res.data.latest_photos) {
          photos = res.data.latest_photos;
        } else {
          if (res.data.photos.length === 0) {
            throw new Error("Data is empty");
          } else {
            photos = res.data.photos;
          }
        }

        // setData((prevValue) => {
        //   return {
        //     ...prevValue,
        //     data: { ...res.data, photos: photos },
        //     isLoading: false,
        //     isError: false,
        //   };
        // });
        dispatch(fetchMarsImageDataSuccess({ photos: photos }));
        setCurrentPage(1);
      } catch (err) {
        // setData((prevValue) => {
        //   return { ...prevValue, isLoading: false, isError: true };
        // });
        dispatch(fetchMarsImageDataError());
        setCurrentPage(1);
      }
    };
    fetchData();
  }, [roverType, sol, isLatest]);

  useEffect(() => {
    const fetchData = async () => {
      let requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?api_key=${apiKey}&sol=${sol}&page=${currentPage}`;

      if (isLatest) {
        requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/latest_photos?api_key=${apiKey}&page=${currentPage}`;
      }
      try {
        // setData((prevValue) => {
        //   return { ...prevValue, isLoading: true };
        // });
        dispatch(fetchMarsImageDataStart());
        const res = await axios.get(requestUrl);
        let photos;

        if (res.data.latest_photos) {
          photos = res.data.latest_photos;
        } else {
          if (res.data.photos.length === 0) {
            throw new Error("Data is empty");
          } else {
            photos = res.data.photos;
          }
        }

        // setData((prevValue) => {
        //   return {
        //     ...prevValue,
        //     data: { ...res.data, photos: photos },
        //     isLoading: false,
        //     isError: false,
        //   };
        // });

        dispatch(fetchMarsImageDataSuccess({ photos: photos }));
      } catch (err) {
        // setData((prevValue) => {
        //   return { ...prevValue, isLoading: false, isError: true };
        // });
        dispatch(fetchMarsImageDataError());
      }
    };
    fetchData();
  }, [currentPage]);

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
      <section id="mars-search-box">
        <Card
          className="sm:max-w-[400px] w-11/12 border mx-auto my-2"
          shadow="sm"
          radius="sm"
        >
          <CardBody className="flex flex-col gap-2">
            <div className="border rounded-2xl  p-4  bg-slate-50 relative">
              <span className="absolute right-0 top-1">
                <Popover placement="bottom" showArrow>
                  <PopoverTrigger>
                    <Button className="bg-transparent" size="sm">
                      <FaCircleInfo className="text-gray-400 text-lg" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="w-48 p-2 flex flex-col gap-2 font-bold py-4 text-gray-500">
                      <p>Name: {data.photos[0].rover.name}</p>
                      <p>Landing date: {data.photos[0].rover.landing_date}</p>
                      <p>Launch date: {data.photos[0].rover.launch_date}</p>
                      <p className="capitalize">
                        Status: {data.photos[0].rover.status}
                      </p>
                      <p>Max sol: {data.photos[0].rover.max_sol}</p>
                      <p>Total Photos: {data.photos[0].rover.total_photos}</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </span>
              <RadioGroup
                value={roverType}
                label="Choose Rover"
                onValueChange={setRoverType}
              >
                <div className="flex items-center gap-6 relative">
                  <Radio value="curiosity">Curiosity </Radio>

                  <Radio value="perseverance">Perseverance</Radio>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between h-20 items-center border p-2 bg-slate-50">
              <div className="w-1/2 ">
                <Switch
                  isSelected={isLatest}
                  onValueChange={setIslatest}
                  color="secondary"
                >
                  Latest Photos
                </Switch>
              </div>
              {!isLatest && (
                <div className="w-1/2">
                  <div className="flex">
                    <span className="text-md">Martian Sol</span>
                    <Popover placement="top">
                      <PopoverTrigger>
                        <Button className="bg-transparent" size="sm">
                          <FaQuestion className="text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="w-48 p-2 text-gray-600">
                          Photos are organized by the sol (Martian rotation or
                          day) on which they were taken, counting up from the
                          rover's landing date
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Input
                    type="number"
                    placeholder="1"
                    value={sol}
                    size="sm"
                    onValueChange={setSol}
                    color="secondary"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center w-full gap-2 border p-2 h-16 bg-slate-50">
              <div className="w-1/2">
                <Switch
                  isSelected={showAll}
                  onValueChange={setShowAll}
                  color="secondary"
                >
                  Show All
                </Switch>
              </div>
              {!showAll && (
                <div className="w-1/2 self-end">
                  <Select
                    label="Camera"
                    variant="bordered"
                    placeholder="Select Camera"
                    size="sm"
                    className="max-w-xs"
                    onChange={(e) => setCameraType(e.target.value)}
                  >
                    {data.photos[0].rover.cameras.map((camera) => {
                      return (
                        <SelectItem key={camera.name}>{camera.name}</SelectItem>
                      );
                    })}
                  </Select>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </section>
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
