import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  Card,
  CardBody,
  Tooltip,
  Divider,
  Button,
  Image,
  Input,
  Spinner,
} from "@nextui-org/react";

import axios from "axios";
import { FaQuestion } from "react-icons/fa6";

const apiKey = import.meta.env.VITE_API_KEY;

function MarsImagesPage() {
  const [roverType, setRoverType] = useState<string>("curiosity");
  const [data, setData] = useState({
    data: { photos: [{ img_src: "", id: "" }] },
    isLoading: false,
  });

  const [sol, setSol] = useState<string>("1");

  useEffect(() => {
    const fetchData = async () => {
      const requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?api_key=${apiKey}&sol=${sol}&page=1`;
      try {
        setData((prevValue) => {
          return { ...prevValue, isLoading: true };
        });
        const res = await axios.get(requestUrl);
        setData((prevValue) => {
          return { ...prevValue, data: res.data, isLoading: false };
        });
      } catch (err) {
        console.log(err);
        setData((prevValue) => {
          return { ...prevValue, isLoading: false };
        });
      }
    };
    fetchData();
  }, [roverType, sol]);
  return (
    <>
      <NavigationBar />
      <section id="mars-search-box">
        <Card
          className="sm:max-w-[400px] w-11/12 border mx-auto my-2"
          shadow="sm"
          radius="sm"
        >
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-between border rounded-2xl p-4 bg-slate-50 ">
              <div className=" self-center">Choose Rover:</div>
              <div className="flex justify-center items-center gap-6">
                <div className="flex flex-col  items-center gap-4">
                  <label htmlFor="earth">Curiosity</label>
                  <input
                    type="radio"
                    value="curiosity"
                    defaultChecked
                    id="curiosity"
                    name="rover-type"
                    onChange={(e) => setRoverType(e.target.value)}
                    className="w-6 h-6 text-gray-500 bg-green-400"
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                  <label htmlFor="earth">Perseverance</label>
                  <input
                    type="radio"
                    value="perseverance"
                    id="perseverance"
                    name="rover-type"
                    onChange={(e) => setRoverType(e.target.value)}
                    className="w-6 h-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div>
                <div className="flex items-center">
                  <span>Martian Sol</span>
                  <Tooltip
                    content="Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date"
                    className="w-48 p-2"
                  >
                    <Button className="bg-transparent">
                      <FaQuestion className="text-sm text-gray-500" />
                    </Button>
                  </Tooltip>
                </div>
                <Input
                  type="number"
                  placeholder="1"
                  value={sol}
                  onValueChange={setSol}
                  color="secondary"
                />
              </div>
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
                <div key={d.id} className="hover:cursor-zoom-in">
                  <TransformWrapper>
                    <TransformComponent>
                      <Image
                        removeWrapper
                        className="w-[400px] h-[400px] bg-black object-contain"
                        src={d.img_src}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              );
            })}
            {data.data.photos.length === 0 && <div>No Data found...</div>}
          </div>
        )}
      </div>
    </>
  );
}

export default MarsImagesPage;
