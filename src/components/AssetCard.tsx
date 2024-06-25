import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Image,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";

interface assetData {
  href: string;
  links: [{ href: string }];
  data: [{ title: string; media_type: string }];
}
interface AssetDataProp {
  d: assetData;
}

function AssetCard(props: AssetDataProp) {
  const { d } = props;
  const [mp4Link, setMp4Link] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);

  const handleClick = async () => {
    setVideoLoading(true);
    const res = await axios.get(d.href);
    // Find the first .mp4 link
    const mp4Link = res.data.find((link: string) => link.endsWith(".mp4"));

    setMp4Link(mp4Link);
    setVideoLoading(false);
  };

  return (
    <Card className="w-[400px] min-h-[400px]">
      <CardHeader>
        {mp4Link ? (
          <div className="relative w-full h-[250px]">
            <ReactPlayer
              url={mp4Link}
              controls={true}
              light={
                <img
                  src={d.links[0].href}
                  height={400}
                  alt="Thumbnail"
                  className="h-full w-full"
                />
              }
              height="100%"
              width="100%"
              className="absolute left-0 top-0"
            />
          </div>
        ) : (
          <div className="w-[400px] h-[250px] justify-center items-center flex ">
            {videoLoading ? (
              <Spinner />
            ) : (
              <>
                {d.links ? (
                  <Image
                    removeWrapper
                    src={d.links[0].href}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    removeWrapper
                    className="h-full w-full object-contain"
                    src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1717836612/yfv3rrjmmiodj3et2pz0.png"
                  />
                )}
              </>
            )}
          </div>
        )}
      </CardHeader>

      <CardBody>
        <h1 className="font-bold">{d.data[0].title}</h1>
        <div className="flex justify-between items-center px-4 py-2 w-full">
          <span className=" font-KneWave">
            Media Type : {d.data[0]?.media_type}
          </span>
          {d.data[0]?.media_type === "video" && (
            <Button color="secondary" size="sm" onClick={handleClick}>
              <FaPlay />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
export default AssetCard;
