import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import {
  fetchQueryDataStart,
  fetchQueryDataError,
  fetchQueryDataSuccess,
  AppDispatch,
} from "../store/store";
import { useDispatch } from "react-redux";

type Input = {
  searchText: string;
};

function MediaSearchBox() {
  const dispatch: AppDispatch = useDispatch();
  const { register, handleSubmit } = useForm<Input>();

  const handleSearch: SubmitHandler<Input> = async (data) => {
    const url = `https://images-api.nasa.gov/search?q=${data.searchText}`;
    try {
      dispatch(fetchQueryDataStart());
      const res = await axios.get(url);
      if (res.data.collection.items.length === 0) {
        dispatch(
          fetchQueryDataError(`No Data Found for query:${data.searchText}`)
        );
      } else {
        dispatch(fetchQueryDataSuccess(res.data.collection));
      }
    } catch (err) {
      dispatch(fetchQueryDataError("Unknown Error !!"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className=" p-4 sm:w-11/12 mx-auto flex items-center justify-center gap-4"
    >
      <input
        {...register("searchText")}
        placeholder="Search NASA Media Libraray of Image,Video Audio"
        className="px-4 py-2 w-1/2 rounded-xl border-2"
      />
      <button
        type="submit"
        className="px-4 py-2 border-2 rounded-lg bg-gray-100"
      >
        <FaSearch />
      </button>
    </form>
  );
}

export default MediaSearchBox;
