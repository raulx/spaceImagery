/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  fetchMarsImageDataError,
  fetchMarsImageDataStart,
  fetchMarsImageDataSuccess,
} from "../store/store";
import axios from "axios";
import { SetStateAction, useEffect } from "react";

interface MarsImagePaginationProps {
  isLatest: boolean;
  currentPage: number;
  roverType: string;
  sol: string;
  totalPages: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

const apiKey = import.meta.env.VITE_API_KEY;

function MarsImagesPagination(props: MarsImagePaginationProps) {
  const { isLatest, currentPage, roverType, sol, totalPages, setCurrentPage } =
    props;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      let requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/photos?api_key=${apiKey}&sol=${sol}&page=${currentPage}`;

      if (isLatest) {
        requestUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverType}/latest_photos?api_key=${apiKey}&page=${currentPage}`;
      }
      try {
        dispatch(fetchMarsImageDataStart());
        const res = await axios.get(requestUrl);
        let photos;

        if (res.data.latest_photos) {
          photos = res.data.latest_photos;
        } else {
          if (res.data.photos.length === 0) {
            throw new Error("Data is empty");
          } else {
            photos = res.data.photos;
          }
        }

        dispatch(fetchMarsImageDataSuccess({ photos: photos }));
      } catch (err) {
        dispatch(fetchMarsImageDataError());
      }
    };
    fetchData();
  }, [currentPage]);
  return (
    <div className="w-full flex justify-center items-center my-10">
      <Pagination
        color="secondary"
        total={totalPages}
        page={currentPage}
        onChange={setCurrentPage}
        showControls
        loop
      />
    </div>
  );
}

export default MarsImagesPagination;
