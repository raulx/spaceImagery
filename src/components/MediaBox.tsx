import { Spinner, Button, RadioGroup, Radio } from "@nextui-org/react";
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
      <div className="flex justify-center items-center min-h-96">
        <h1 className="text-2xl font-bold">{errorMessage}</h1>
      </div>
    );
  } else {
    render = (
      <>
        {metadata.total_hits > 0 ? (
          <>
            <div className="flex rounded-lg bg-red-50 sm:w-[400px] w-11/12 mx-auto border my-2 px-2 py-4 justify-center items-center ">
              <RadioGroup
                label="Select Media Type"
                value={mediaType}
                className="gap-2"
                orientation="horizontal"
                onValueChange={setmediaType}
              >
                {typesOfMedia.map((media) => (
                  <Radio key={media.key} value={media.key} className="sm:mx-1">
                    {media.value}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
            {filteredData.length > 0 ? (
              <div className="p-4 flex gap-4 justify-center min-h-[500px] items-center flex-wrap bg-red-400">
                {filteredData.map((d) => {
                  return <AssetCard key={d.href} d={d} />;
                })}
              </div>
            ) : (
              <div className="text-3xl font-bold text-center my-12">
                No Match Found For Media Type {mediaType}, Change Page !!!
              </div>
            )}

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
            <h1 className="text-2xl font-bold">
              {errorMessage || <>Search The NASA Database.</>}
            </h1>
          </div>
        )}
      </>
    );
  }
  return <div>{render}</div>;
}

export default MediaBox;
