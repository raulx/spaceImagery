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
  );
}

export default MediaSearchBox;
