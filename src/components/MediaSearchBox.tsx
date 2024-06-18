import { Input } from "@nextui-org/react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import {
  fetchQueryDataStart,
  fetchQueryDataError,
  fetchQueryDataSuccess,
  AppDispatch,
} from "../store/store";
import { useDispatch } from "react-redux";
import { useState } from "react";

function MediaSearchBox() {
  const dispatch: AppDispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = async () => {
    const url = `https://images-api.nasa.gov/search?q=${searchText}`;
    if (searchText === "") {
      console.log("select a text");
    } else {
      try {
        dispatch(fetchQueryDataStart());
        const res = await axios.get(url);

        if (res.data.collection.items.length === 0) {
          dispatch(fetchQueryDataError("Search The Database."));
        } else {
          dispatch(fetchQueryDataSuccess(res.data.collection));
        }
      } catch (err) {
        dispatch(fetchQueryDataError("Unknown Error !!"));
      }
    }
  };
  return (
    <div className="sm:w-1/3 w-11/12 mx-auto flex justify-center items-center p-2 border-2 gap-2 rounded-lg my-2">
      <Input
        variant="bordered"
        placeholder="Search Media"
        radius="sm"
        value={searchText}
        onValueChange={setSearchText}
        className="focus:outline-none"
      />
      <button className="p-2 bg-gray-200 rounded-full" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
}

export default MediaSearchBox;
