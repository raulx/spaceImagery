import { useState } from "react";
import NavigationBar from "../components/NavigationBar";

import {
  Card,
  CardBody,
  Button,
  Divider,
  Image,
  Input,
} from "@nextui-org/react";

import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

// const baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiKey}`;

function MarsImagesPage() {
  const [roverType, setRoverType] = useState<string>("curiosity");
  const [data, setData] = useState({
    data: { photos: [{ img_src: "", id: "" }] },
    isLoading: false,
  });

  const [sol, setSol] = useState<string>("");

  const handleSearch = async () => {
    const requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?api_key=${apiKey}&sol=${sol}`;

    try {
      setData((prevValue) => {
        return { ...prevValue, isLoading: true };
      });
      const res = await axios.get(requestUrl);
      console.log(res);
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

  return (
    <>
      <NavigationBar />
      <section id="mars-search-box">
        <Card className=" max-w-[400px] mx-auto my-2" shadow="sm" radius="sm">
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-between border rounded-2xl p-4 ">
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
                    className="w-8 h-8 text-gray-500 bg-green-400"
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
                    className="w-8 h-8"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div>
                <Input
                  type="number"
                  label="Sol"
                  placeholder="0"
                  value={sol}
                  onValueChange={setSol}
                  color="secondary"
                />
              </div>
            </div>
            <Button
              className="w-1/4 mx-auto"
              color="secondary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </CardBody>
        </Card>
      </section>
      <Divider className="my-4" />
      {data.isLoading ? (
        <div>loading data...</div>
      ) : (
        <div className="flex flex-wrap w-full justify-between gap-4">
          {data.data.photos.map((d) => {
            return <Image src={d.img_src} key={d.id} width={300} />;
          })}
        </div>
      )}
    </>
  );
}

export default MarsImagesPage;
