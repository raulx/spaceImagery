import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { GiExpand } from "react-icons/gi";
import { handleOpenFullImage } from "../utils/functions";

function ImageCard(props: { imgLink: string; title: string }) {
  const { imgLink, title } = props;
  return (
    <Card className="w-[400px] h-[440px]">
      <Button
        isIconOnly
        className="absolute top-2 right-2 z-10"
        onPress={() => handleOpenFullImage(imgLink)}
      >
        <GiExpand />
      </Button>

      <CardFooter className="bottom-0 left-0 absolute z-10 bg-black  ">
        <h1 className="text-white">{title}</h1>
      </CardFooter>
      <Image
        removeWrapper
        alt="image background"
        src={imgLink}
        className="z-0 h-full w-full object-cover"
      />
    </Card>
  );
}

export default ImageCard;
