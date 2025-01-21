import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Button, Divider, Radio, RadioGroup, Spinner } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  fetchQueryDataStart,
  fetchQueryDataError,
  fetchQueryDataSuccess,
  RootState,
} from "../store/store";
import { useState } from "react";
import AssetCard from "../components/AssetCard";
import { typesOfMedia } from "../utils/variables";

type Input = {
  searchText: string;
};

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
                {typesOfMedia.map((media: { key: string; value: string }) => (
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

function GalleryPage() {
  const dispatch: AppDispatch = useDispatch();
  const { register, handleSubmit } = useForm<Input>();

  const handleSearch: SubmitHandler<Input> = async (data) => {
    const url = `https://images-api.nasa.gov/search?q=${data.searchText}`;
    try {
      dispatch(fetchQueryDataStart());
      const res = await axios.get(url);
      if (res.data.collection.items.length === 0) {
        dispatch(
          fetchQueryDataError(
            <>
              <p className="text-6xl text-center font-bold text-gray-400 my-2">
                Oops.
              </p>
              <p className="m-2">
                No Data Found for query :
                <span className="font-extrabold text-3xl text-red-800">
                  {data.searchText}
                </span>
              </p>
            </>
          )
        );
      } else {
        dispatch(fetchQueryDataSuccess(res.data.collection));
      }
    } catch (err) {
      dispatch(fetchQueryDataError("Unknown Error !!"));
    }
  };

  return (
    <>
      <NavigationBar />
      <main className="min-h-[800px]">
        {/* search component  */}
        <form
          onSubmit={handleSubmit(handleSearch)}
          className="my-2 sm:w-11/12 mx-auto flex items-center justify-center sm:h-12 h-10 sm:px-0 px-2"
        >
          <input
            {...register("searchText", { required: true })}
            placeholder="Search NASA Media"
            autoFocus
            className="px-4 py-2 rounded-l-full border-2 sm:w-1/2 w-full h-full "
          />
          <button
            type="submit"
            className="h-full w-16  border-2 border-l-0 rounded-r-full flex justify-center items-center bg-[#FFF6F6]"
          >
            <FaSearch />
          </button>
        </form>

        <Divider />
        <MediaBox />
      </main>
      <Footer />
    </>
  );
}

export default GalleryPage;
