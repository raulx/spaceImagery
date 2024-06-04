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
} from "@nextui-org/react";

import axios from "axios";
import { FaQuestion, FaCircleInfo } from "react-icons/fa6";
import Footer from "../components/Footer";

const apiKey = import.meta.env.VITE_API_KEY;

function MarsImagesPage() {
  const [roverType, setRoverType] = useState<string>("curiosity");
  const [isLatest, setIslatest] = useState<boolean>(true);
  const [data, setData] = useState({
    data: {
      photos: [
        {
          img_src: "",
          id: "",
          sol: "",
          earth_date: "",
          camera: { name: "" },
          rover: {
            name: "",
            landing_date: "",
            launch_date: "",
            status: "",
            max_sol: "",
            max_date: "",
            total_photos: "",
          },
        },
      ],
    },
    isLoading: false,
  });

  const [sol, setSol] = useState<string>("1");

  useEffect(() => {
    const fetchData = async () => {
      let requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?api_key=${apiKey}&sol=${sol}&page=1`;

      if (isLatest) {
        requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/latest_photos?api_key=${apiKey}&page=1`;
      }
      try {
        setData((prevValue) => {
          return { ...prevValue, isLoading: true };
        });
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

        setData((prevValue) => {
          return {
            ...prevValue,
            data: { ...res.data, photos: photos },
            isLoading: false,
          };
        });
      } catch (err) {
        console.log(err);
        setData((prevValue) => {
          return { ...prevValue, isLoading: false };
        });
      }
    };
    fetchData();
  }, [roverType, sol, isLatest]);
  return (
    <>
      <NavigationBar />
      <section id="mars-search-box">
        <Card
          className="sm:max-w-[300px] w-11/12 border mx-auto my-2"
          shadow="sm"
          radius="sm"
        >
          <CardBody className="flex flex-col gap-4">
            <div className="border rounded-2xl  p-4  bg-slate-50 relative ">
              <span className="absolute right-0 top-1">
                <Popover placement="bottom" showArrow>
                  <PopoverTrigger>
                    <Button className="bg-transparent" size="sm">
                      <FaCircleInfo className="text-gray-400 text-lg" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="w-48 p-2 text-gray-600">
                      <p>Name:{data.data.photos[0].rover.name}</p>
                      <p>
                        Landing date:
                        {data.data.photos[0].rover.landing_date}
                      </p>
                      <p>
                        Launch date:
                        {data.data.photos[0].rover.launch_date}
                      </p>
                      <p>
                        Status:
                        {data.data.photos[0].rover.status}
                      </p>
                      <p>
                        Max sol:
                        {data.data.photos[0].rover.max_sol}
                      </p>
                      <p>
                        Total Photos:
                        {data.data.photos[0].rover.total_photos}
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
                <div className="flex items-center gap-6 relative">
                  <Radio value="curiosity">Curiosity </Radio>

                  <Radio value="perseverance">Perseverance</Radio>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Switch isSelected={isLatest} onValueChange={setIslatest}>
                Latest
              </Switch>
            </div>

            <div className="flex justify-between items-center gap-2">
              {!isLatest && (
                <div>
                  <div className="flex items-center">
                    <span>Martian Sol</span>
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
                    onValueChange={setSol}
                    color="secondary"
                  />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </section>
      <Divider className="my-6" />
      <div className="min-h-96">
        {data.isLoading ? (
          <div className="w-screen flex justify-center items-center h-96">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="flex flex-wrap w-full justify-center sm:gap-12 gap-16 p-4">
            {data.data.photos?.map((d) => {
              return (
                <div key={d.id} className="hover:cursor-zoom-in relative">
                  <TransformWrapper>
                    <TransformComponent>
                      <Image
                        removeWrapper
                        className="w-[400px] h-[400px] bg-black object-contain"
                        src={d.img_src}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                  <div className=" absolute right-0 top-1">
                    <Popover placement="top">
                      <PopoverTrigger>
                        <Button className="bg-transparent" size="sm">
                          <FaCircleInfo className="text-white text-lg" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="w-48 p-2 text-gray-600">
                          <p>Id:{d.id}</p>
                          <h4>Sol:{d.sol}</h4>
                          <p>Earth Date:{d.earth_date}</p>
                          <p>Camera:{d.camera.name}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              );
            })}
            {data.data.photos.length === 0 && <div>No Data found...</div>}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default MarsImagesPage;
