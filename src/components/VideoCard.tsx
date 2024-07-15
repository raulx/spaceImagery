import { Spinner, Image, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { AssetDataProp } from "./AssetCard";
import ReactPlayer from "react-player";
import axios from "axios";

interface QualityType {
  orig: string;
  large: string;
  medium: string;
  mobile: string;
  preview: string;
  small: string;
}
const quality: QualityType = {
  orig: "1080p",
  large: "720p",
  medium: "480p",
  mobile: "360p",
  preview: "240p",
  small: "144p",
};

export function VideoCard(props: AssetDataProp) {
  const { d } = props;

  const [mediaLink, setMediaLink] = useState<string>("");

  const [videoLoading, setVideoLoading] = useState(false);

  const [allMediaLinks, setAllMediaLinks] = useState<string[]>([]);

  const [allVideoQualities, setAllVideoQualities] = useState<string[]>([]);

  const mediaType = d.data[0]?.media_type;

  const handleClick = async () => {
    setVideoLoading(true);

    const res = await axios.get(d.href);
    let newLink;

    if (mediaType === "video") {
      // Find the first .mp4 link
      const videoLinks = res.data.filter((file: string) =>
        file.endsWith(".mp4")
      );
      // taking out different quality of videos and storing them in a state in a sorted order.
      const videoQualities = videoLinks.map((link: string) => {
        const part = link.split("~"); // ["https://videoLink.com","large.mp4"]
        //get the last item and split out the qualityType
        const part2 = part[part.length - 1].split("."); // [large,.mp4]
        const part3 = part2[0];

        const finalPart = isQualityKey(part3) ? quality[part3] : undefined;

        return finalPart;
      });

      const qualityOrder = ["1080p", "720p", "480p", "360p", "240p", "144p"];

      videoQualities.sort(
        (a: string, b: string) =>
          qualityOrder.indexOf(a) - qualityOrder.indexOf(b)
      );

      setAllVideoQualities(videoQualities);

      setAllMediaLinks(videoLinks);

      newLink = res.data.find((link: string) => link.endsWith(".mp4"));
    } else if (mediaType === "audio") {
      //Find the first .mp3 link
      newLink = res.data.find((link: string) => link.endsWith("128k.mp3"));
    }
    setMediaLink(newLink);
    setVideoLoading(false);
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Object.values(quality).indexOf(e.target.value);
    const foundKey = Object.keys(quality)[index];
    const videoQuality =
      allMediaLinks.find((link: string) => link.endsWith(`${foundKey}.mp4`)) ||
      "";
    setMediaLink(videoQuality);
  };

  function isQualityKey(key: string): key is keyof QualityType {
    return key in quality;
  }
  return (
    <Card className="w-[400px] h-[440px]">
      <CardHeader>
        {mediaLink ? (
          <div className="flex flex-col items-center w-full">
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
            {mediaType === "video" && (
              <div className="flex items-center space-x-2">
                <label htmlFor="quality" className="text-lg font-medium">
                  Select Quality:
                </label>
                <select
                  id="quality"
                  onChange={handleSelectionChange}
                  className="p-2 border rounded-md"
                >
                  {allVideoQualities.map((link) => {
                    return <option key={link}>{link}</option>;
                  })}
                </select>
              </div>
            )}
          </div>
        ) : (
          <div className="w-[400px] h-[250px] justify-center items-center flex relative ">
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
            <button
              onClick={handleClick}
              className="w-16 h-16 rounded-full flex justify-center items-center opacity-50 bg-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <FaPlay />
            </button>
          </div>
        )}
      </CardHeader>

      <CardBody>
        <h1 className="font-bold">{d.data[0].title}</h1>
        <div className="flex justify-between items-center px-4 py-2 w-full">
          <span className="font-KneWave">Media Type : {mediaType}</span>
        </div>
      </CardBody>
    </Card>
  );
}
