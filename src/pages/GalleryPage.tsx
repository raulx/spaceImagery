import { FaMicrophone, FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Divider, Input } from "@nextui-org/react";
import { useState } from "react";

function GalleryPage() {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = () => {
    console.log(searchText);
  };
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
          <button className="p-2 bg-gray-50 rounded-full">
            <FaMicrophone />
          </button>
        </div>
        <Divider className="my-8" />
      </main>
      <Footer />
    </>
  );
}

export default GalleryPage;
