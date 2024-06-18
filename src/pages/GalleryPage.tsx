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
        <Divider className="my-4" />
        <MediaBox />
      </main>
      <Footer />
    </>
  );
}

export default GalleryPage;
