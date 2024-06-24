import { Spinner, Select, SelectItem, Button } from "@nextui-org/react";
import typesOfMedia from "../utils/data";
import {
  AppDispatch,
  RootState,
  fetchQueryDataError,
  fetchQueryDataStart,
  fetchQueryDataSuccess,
} from "../store/store";
import AssetCard from "./AssetCard";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

function MediaBox() {
  const [mediaType, setmediaType] = useState<string>("All");
  const dispatch: AppDispatch = useDispatch();
  const { collection, metadata, links, isLoading, isError, errorMessage } =
    useSelector((state: RootState) => {
      return state.queryData;
    });

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setmediaType(e.target.value);
  };

  const handlePageChange = async (d: {
    rel: string;
    prompt: string;
    href: string;
  }) => {
    const queryUrl = d.href;
    //slice the query url and make it https instead of http because http causes issue in production.
    const slicedQueryUrl = `https://${queryUrl.slice(7)}`;

    try {
      dispatch(fetchQueryDataStart());

      const res = await axios.get(slicedQueryUrl);

      dispatch(fetchQueryDataSuccess(res.data.collection));
    } catch (error) {
      console.log(error);
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
                return <AssetCard key={d.href} d={d} />;
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
  return <div className="my-4">{render}</div>;
}

export default MediaBox;
