import ImageCard from "./ImageCard";
import { VideoCard } from "./VideoCard";

interface assetData {
  href: string;
  links: [{ href: string }];
  data: [{ title: string; media_type: string; description: string }];
}
export interface AssetDataProp {
  d: assetData;
}

function AssetCard(props: AssetDataProp) {
  const { d } = props;
  const mediaType = d.data[0]?.media_type;

  return (
    <>
      {mediaType === "image" ? (
        <ImageCard title={d.data[0].title} imgLink={d.links[0].href} />
      ) : (
        <>
          <VideoCard d={d} />
        </>
      )}
    </>
  );
}
export default AssetCard;
