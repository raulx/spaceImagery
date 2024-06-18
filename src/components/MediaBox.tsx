import {
  Spinner,
  Select,
  SelectItem,
  Card,
  CardHeader,
  Divider,
  CardBody,
  Button,
  Image,
  CardFooter,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import typesOfMedia from "../utils/data";
import {
  AppDispatch,
  RootState,
  fetchQueryDataError,
  fetchQueryDataStart,
  fetchQueryDataSuccess,
} from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

function MediaBox() {
  const [mediaType, setmediaType] = useState<string>("All");
  const dispatch: AppDispatch = useDispatch();
  const [description, setDescription] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { collection, metadata, links, isLoading, isError, errorMessage } =
    useSelector((state: RootState) => {
      return state.queryData;
    });

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
      dispatch(fetchQueryDataStart());

      const res = await axios.get(queryUrl);

      dispatch(fetchQueryDataSuccess(res.data.collection));
    } catch (error) {
      dispatch(fetchQueryDataError("Unknown Error occured"));
    }
  };

  let render;

  const filteredData = collection.filter((d) => {
    if (mediaType === "All") {
      return d;
    } else if (d.data[0].media_type === mediaType) {
      return d;
    }
  });

  if (isLoading) {
    render = (
      <div className="w-screen flex justify-center items-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  } else if (isError) {
    render = (
      <div className="w-screen flex justify-center items-center h-96">
        <div className="w-48 h-48 bg-yellow-400">Error Occured</div>
      </div>
    );
  } else {
    render = (
      <>
        {metadata.total_hits > 0 ? (
          <>
            <div className="flex justify-center gap-8 items-center w-11/12 mx-auto ">
              <span className="text-center font-bold  my-2">
                Results Found:
                {metadata.total_hits}
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
              {links?.map((d) => {
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
    <div className="my-4">
      {render}
      <>
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
    </div>
  );
}

export default MediaBox;
