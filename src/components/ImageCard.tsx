import { Button, Card, CardFooter, Image } from "@nextui-org/react"; // Importing necessary components from @nextui-org/react
import { GiExpand } from "react-icons/gi"; // Importing expand icon from react-icons
import { handleOpenFullImage } from "../utils/functions"; // Importing utility function to handle image expansion

// ImageCard component definition
function ImageCard(props: { imgLink: string; title: string }) {
  let { imgLink, title } = props; // Destructuring props to extract imgLink and title

  // Check if the image link uses http protocol, which is blocked by the browser
  if (imgLink.split(":")[0] === "http") {
    // Replace http link with a placeholder image and update the title
    imgLink =
      "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717836612/yfv3rrjmmiodj3et2pz0.png";
    title = "Link Expired !";
  }

  // Return the Card component with the image and title
  return (
    <Card className="w-[400px] h-[440px]">
      {/* Card component with fixed width and height */}
      <Button
        isIconOnly
        className="absolute top-2 right-2 z-10"
        onPress={() => handleOpenFullImage(imgLink)} // Handle button press to open full image
      >
        <GiExpand /> {/* Expand icon */}
      </Button>
      <CardFooter className="bottom-0 left-0 absolute z-10 bg-black">
        {/* Card footer with title */}
        <h1 className="text-white">{title}</h1>{" "}
        {/* Title displayed in white text */}
      </CardFooter>
      <Image
        removeWrapper
        alt="image background"
        fallbackSrc="https://heroui.com/images/fruit-4.jpeg"
        src={imgLink}
        className="z-0 h-full w-full object-cover"
      />
    </Card>
  );
}

export default ImageCard; // Exporting the ImageCard component as default
