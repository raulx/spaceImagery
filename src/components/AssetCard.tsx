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
  const [mediaLink, setMediaLink] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);

  const mediaType = d.data[0]?.media_type;

  const handleClick = async () => {
    setVideoLoading(true);
    const res = await axios.get(d.href);
    let newLink;
    if (mediaType === "video") {
      // Find the first .mp4 link
      newLink = res.data.find((link: string) => link.endsWith(".mp4"));
    } else if (mediaType === "audio") {
      //Find the first .mp3 link
      newLink = res.data.find((link: string) => link.endsWith("128k.mp3"));
    }
    setMediaLink(newLink);
    setVideoLoading(false);
  };

  return (
    <Card className="w-[400px] h-[440px]">
      <CardHeader>
        {mediaLink ? (
          <div className="relative w-full h-[250px]">
            <ReactPlayer
              url={mediaLink}
              controls={true}
              light={
                <img
                  src={
                    d.links
                      ? d.links[0].href
                      : "https://res.cloudinary.com/dj5yf27lr/image/upload/v1719301878/spaceImagery/rl7zqrmxjdq6piw0qwvn.jpg"
                  }
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
                    src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1719301878/spaceImagery/rl7zqrmxjdq6piw0qwvn.jpg"
                  />
                )}
              </>
            )}
          </div>
        )}
      </CardHeader>

      <CardBody>
        <h1 className="font-bold ">{d.data[0].title}</h1>
        <div className="flex justify-between items-center px-4 py-2 w-full">
          <span className=" font-KneWave">Media Type : {mediaType}</span>

          {mediaType === "video" || mediaType === "audio" ? (
            <Button color="secondary" size="sm" onClick={handleClick}>
              <FaPlay />
            </Button>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
}
export default AssetCard;
