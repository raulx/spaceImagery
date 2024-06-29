import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Divider } from "@nextui-org/react";

import MediaSearchBox from "../components/MediaSearchBox";
import MediaBox from "../components/MediaBox";

function GalleryPage() {
  return (
    <>
      <NavigationBar />
      <main className="min-h-[800px]">
        <MediaSearchBox />
        <Divider />
        <MediaBox />
      </main>
      <Footer />
    </>
  );
}

export default GalleryPage;
