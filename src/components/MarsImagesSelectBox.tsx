/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardBody,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  RadioGroup,
  Radio,
  Switch,
  Input,
} from "@nextui-org/react";
import { FaQuestion } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  fetchMarsImageDataError,
  fetchMarsImageDataStart,
  fetchMarsImageDataSuccess,
} from "../store/store";
import axios from "axios";
import { SetStateAction, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

interface MarsImagesSelectBoxProps {
  currentPage: number;
  isLatest: boolean;
  roverType: string;
  sol: string;
  setSol: React.Dispatch<SetStateAction<string>>;
  setRoverType: React.Dispatch<SetStateAction<string>>;
  setIsLatest: React.Dispatch<SetStateAction<boolean>>;
  setTotalPages: React.Dispatch<SetStateAction<number>>;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

function MarsImagesSelectBox(props: MarsImagesSelectBoxProps) {
  const { data } = useSelector((state: RootState) => {
    return state.marsImages;
  });

  const {
    isLatest,
    roverType,
    sol,
    setSol,
    setRoverType,
    setIsLatest,
    setTotalPages,

    setCurrentPage,
  } = props;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?api_key=${apiKey}&sol=${sol}&page=1`;
      let metaUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?api_key=${apiKey}&sol=${sol}`;
      if (isLatest) {
        requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/latest_photos?api_key=${apiKey}&page=1`;
        metaUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/latest_photos?api_key=${apiKey}`;
      }
      try {
        dispatch(fetchMarsImageDataStart());
        const metaData = await axios.get(metaUrl);

        if (metaData.data) {
          const totalPhotos =
            metaData.data.photos?.length ||
            metaData.data.latest_photos?.length ||
            0;

          const totalPages = Math.floor(totalPhotos / 25 + 1);
          setTotalPages(totalPages);
        }
        const res = await axios.get(requestUrl);
        let photos;

        if (res.data.latest_photos) {
          photos = res.data.latest_photos;
        } else {
          if (res.data.photos.length === 0) {
            throw new Error(
              `No Photos Were taken by rover ${roverType} on sol ${sol}`
            );
          } else {
            photos = res.data.photos;
          }
        }

        dispatch(fetchMarsImageDataSuccess({ photos: photos }));
        setCurrentPage(1);
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchMarsImageDataError(err.message));
        } else {
          dispatch(
            fetchMarsImageDataError(
              "Unknown Error Occured Change Sol or RoverType"
            )
          );
        }
        setCurrentPage(1);
      }
    };
    fetchData();
  }, [roverType, sol, isLatest]);

  return (
    <section id="mars-search-box">
      <Card
        className="sm:max-w-[400px] border m-2 sm:mx-auto"
        shadow="sm"
        radius="sm"
      >
        <CardBody className="flex flex-col gap-2">
          <div className="border rounded-2xl  p-4  bg-red-50 relative">
            <span className="absolute right-0 top-1">
              <Popover placement="bottom" showArrow>
                <PopoverTrigger>
                  <Button className="bg-transparent" size="sm">
                    <FaCircleInfo className="text-gray-400 text-lg" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="w-48 p-2 flex flex-col gap-2 font-bold py-4 text-gray-500">
                    <p>
                      <strong>Name:</strong> {data.photos[0].rover.name}
                    </p>
                    <p>
                      <strong>Landing date:</strong>
                      {data.photos[0].rover.landing_date}
                    </p>
                    <p>
                      <strong>Launch data:</strong>
                      {data.photos[0].rover.launch_date}
                    </p>
                    <p className="capitalize">
                      <strong>Status:</strong>
                      {data.photos[0].rover.status}
                    </p>
                    <p>
                      <strong>Max sol:</strong>
                      {data.photos[0].rover.max_sol}
                    </p>
                    <p>
                      <strong>Total Photos:</strong>
                      {data.photos[0].rover.total_photos}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </span>
            <RadioGroup
              value={roverType}
              label="Choose Rover"
              onValueChange={setRoverType}
            >
              <div className="flex items-center justify-around gap-6 mt-2 relative">
                <Radio value="curiosity">Curiosity </Radio>

                <Radio value="perseverance">Perseverance</Radio>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between h-20 items-center border px-4 py-12 bg-red-50">
            <div className="w-1/2 ">
              <Switch
                isSelected={isLatest}
                onValueChange={setIsLatest}
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
        </CardBody>
      </Card>
    </section>
  );
}

export default MarsImagesSelectBox;
