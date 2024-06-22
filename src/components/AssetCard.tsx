import { Card, CardHeader, CardBody, Button, Image } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

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

  const handleClick = async () => {
    const res = await axios.get(d.href);

    // Find the first .mp4 link
    const mp4Link = res.data.find((link: string) => link.endsWith(".mp4"));

    setMp4Link(mp4Link);
  };
  return (
    <Card className="w-[400px] min-h-[400px] ">
      <CardHeader>
        {mp4Link ? (
          <video width="400" height="250" controls>
            <source src={mp4Link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            {d.links ? (
              <Image
                removeWrapper
                src={d.links[0].href}
                className="w-[400px] h-[250px] object-cover"
              />
            ) : (
              <Image
                removeWrapper
                className="w-[400px] h-[250px] object-contain"
                src="https://res.cloudinary.com/dj5yf27lr/image/upload/v1717836612/yfv3rrjmmiodj3et2pz0.png"
              />
            )}
          </>
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
