/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { Divider } from "@nextui-org/react";
import Footer from "../components/Footer";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import MarsImagesSelectBox from "../components/MarsImagesSelectBox";
import MarsImagesPagination from "../components/MarsImagesPagination";
import MarsImagesBox from "../components/MarsImagesBox";

function MarsImagesPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [roverType, setRoverType] = useState<string>("curiosity");
  const [isLatest, setIsLatest] = useState<boolean>(true);
  const [sol, setSol] = useState<string>("1");

  const { isError } = useSelector((state: RootState) => {
    return state.marsImages;
  });

  return (
    <>
      <NavigationBar />
      <main className="min-h-[800px]">
        <MarsImagesSelectBox
          currentPage={currentPage}
          isLatest={isLatest}
          roverType={roverType}
          sol={sol}
          setSol={setSol}
          setRoverType={setRoverType}
          setIsLatest={setIsLatest}
          setTotalPages={setTotalPages}
          setCurrentPage={setCurrentPage}
        />
        <Divider />
        <MarsImagesBox />

        {!isError && (
          <MarsImagesPagination
            isLatest={isLatest}
            currentPage={currentPage}
            roverType={roverType}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            sol={sol}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default MarsImagesPage;
