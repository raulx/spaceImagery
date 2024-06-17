import { FaSearch } from "react-icons/fa";
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
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import typesOfMedia from "../utils/data";
import axios from "axios";

function GalleryPage() {
  const [searchText, setSearchText] = useState<string>("");
  const [description, setDescription] = useState("");
  const [mediaType, setmediaType] = useState<string>("All");
  const [errorMessage, setErrorMessage] = useState<string>(
    "Search The database."
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState({
    collection: [
      {
        href: "",
        data: [
          {
            nasa_id: "",
            title: "",
            media_type: "",
            description: "",
          },
        ],
        links: [{ href: "" }],
      },
    ],
    metadata: {
      total_hits: 0,
    },
    links: [{ rel: "", prompt: "", href: "" }],
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
        console.log(res);
        if (res.data.collection.items.length === 0) {
          setErrorMessage("No Results found");
          setData((prevValue) => {
            return {
              ...prevValue,
              isLoading: false,
            };
          });
        } else {
          setData((prevValue) => {
            return {
              ...prevValue,
              isLoading: false,
              collection: res.data.collection.items,
              metadata: res.data.collection.metadata,
              links: res.data.collection.links,
            };
          });
        }
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

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setmediaType(e.target.value);
  };

  const handlePageChange = async (d: {
    rel: string;
    prompt: string;
    href: string;
  }) => {
    const queryUrl = d.href;
    try {
      setData((prevValue) => {
        return { ...prevValue, isLoading: true };
      });
      const res = await axios.get(queryUrl);
      setData((prevValue) => {
        return {
          ...prevValue,
          isLoading: false,
          collection: res.data.collection.items,
          metadata: res.data.collection.metadata,
          links: res.data.collection.links,
        };
      });
    } catch (error) {
      setData((prevValue) => {
        return { ...prevValue, isError: true };
      });
    }
  };

  let render;

  const filteredData = data.collection.filter((d) => {
    if (mediaType === "All") {
      return d;
    } else if (d.data[0].media_type === mediaType) {
      return d;
    }
  });

  if (data.isLoading) {
    render = (
      <div className="w-screen flex justify-center items-center min-h-96">
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
        {data.metadata.total_hits > 0 ? (
          <>
            <div className="flex justify-center gap-8 items-center w-11/12 mx-auto ">
              <span className="text-center font-bold  my-2">
                Results Found:
                {data.metadata.total_hits}
              </span>
              <div className="w-48 my-4">
                <Select
                  variant="bordered"
                  label="Media Type"
                  value={[mediaType]}
                  onChange={handleSelectionChange}
                >
                  {typesOfMedia.map((media) => {
                    return (
                      <SelectItem key={media.key}>{media.value}</SelectItem>
                    );
                  })}
                </Select>
              </div>
            </div>

            <div className="p-4 flex gap-4 justify-center min-h-[500px] items-center flex-wrap bg-red-400">
              {filteredData.map((d) => {
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
            <div className="sm:w-1/2 mx-auto my-4 flex justify-center gap-4 items-center">
              {data.links?.map((d) => {
                if (d.prompt) {
                  return (
                    <Button key={d.rel} onClick={() => handlePageChange(d)}>
                      {d.prompt}
                    </Button>
                  );
                }
              })}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-96">
            <h1 className="text-2xl font-bold">{errorMessage}</h1>
          </div>
        )}
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
