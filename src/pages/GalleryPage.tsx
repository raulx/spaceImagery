import { FaMicrophone, FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

function GalleryPage() {
  const [searchText, setSearchText] = useState<string>("apollo");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState({
    collection: [
      {
        href: "",
        data: [
          {
            nasa_id: "2231",
            title: "This is title",
            media_type: "",
            description: "This is description...",
          },
        ],
        links: [{ href: "https://picsum.photos/200/300" }],
      },
    ],
    metadata: {
      total_hits: 1,
    },
    isLoading: false,
    isError: false,
  });

  const handleSearch = async () => {
    const url = `https://images-api.nasa.gov/search?q=${searchText}`;
    if (searchText === "") {
      console.log("select a text");
    } else {
      try {
        setData((prevValue) => {
          return { ...prevValue, isLoading: true };
        });
        const res = await axios.get(url);

        setData((prevValue) => {
          return {
            ...prevValue,
            isLoading: false,
            collection: res.data.collection.items,
            metadata: res.data.collection.metadata,
          };
        });
      } catch (err) {
        setData((prevValue) => {
          return { ...prevValue, isError: true };
        });
      }
    }
  };

  const handleOpenDescription = (d: string) => {
    if (d) {
      setDescription(d);
    } else {
      setDescription("No Description available");
    }
    onOpen();
  };
  let render;

  if (data.isLoading) {
    render = (
      <div className="w-screen flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  } else if (data.isError) {
    render = (
      <div className="w-screen flex justify-center items-center h-96">
        <div className="w-48 h-48 bg-yellow-400">Error Occured</div>
      </div>
    );
  } else {
    render = (
      <>
        <h1 className="text-center font-bold text-2xl my-2">
          Total Results:{data.metadata.total_hits}
        </h1>

        <div className="p-4 flex gap-4 justify-center items-center flex-wrap bg-red-400">
          {data.collection.map((d) => {
            return (
              <Card className="w-[400px] min-h-[450px]">
                <CardHeader>
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
                </CardHeader>
                <Divider />
                <CardBody>
                  <h1 className="font-bold">{d.data[0].title}</h1>
                  <p className="text-sm my-4">
                    {d.data[0]?.description?.substring(0, 100)}......
                    <Button
                      className="font-bold bg-transparent "
                      onPress={() =>
                        handleOpenDescription(d.data[0]?.description)
                      }
                    >
                      Read More
                    </Button>
                  </p>
                  <div className="flex justify-between items-center">
                    <span>
                      Media Type:
                      <span className="font-bold uppercase">
                        {d.data[0]?.media_type}
                      </span>
                    </span>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button size="sm" color="secondary">
                    Open
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </>
    );
  }
  return (
    <>
      <NavigationBar />
      <main className="min-h-[800px]">
        <div className="sm:w-1/3 w-11/12 mx-auto flex justify-center items-center p-2 border-2 gap-2 rounded-lg my-2">
          <Input
            variant="bordered"
            placeholder="Search Media"
            radius="sm"
            value={searchText}
            onValueChange={setSearchText}
            className="focus:outline-none"
          />
          <button
            className="p-2 bg-gray-200 rounded-full"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
          <button className="p-2 bg-gray-50 rounded-full">
            <FaMicrophone />
          </button>
        </div>
        <Divider className="my-4" />
        <div className="my-4">{render}</div>
      </main>
      <Footer />
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Description
              </ModalHeader>
              <ModalBody>
                <p>{description}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default GalleryPage;
