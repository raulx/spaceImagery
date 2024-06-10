export const marsRoverCameras:string[] = ["ALL","FHAZ","RHAZ","MAST","CHEMCAM","MAHLI","MARDI","NAVCAM"]

export const marsMockImages:{id:number,url:string}[] = [
    {
      id: 1,
      url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231167/spaceImagery/MarsImages/ohswszwf7yts1u4kdrpb.png",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231167/spaceImagery/MarsImages/v2tl5r2fv7zsijhtxsax.png",
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231167/spaceImagery/MarsImages/ljylsikzp5ncqq13zszc.png",
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231166/spaceImagery/MarsImages/a9cfcb9izfjbywvr1cv8.png",
    },
    {
      id: 5,
      url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231165/spaceImagery/MarsImages/vnxfzljqxvkmzy0zjgju.png",
    },
    {
      id: 6,
      url: "https://res.cloudinary.com/dj5yf27lr/image/upload/v1717231164/spaceImagery/MarsImages/vhpofnvdzelswvgxdemh.png",
    },
  ];

const typesOfMedia:{key:string,value:string}[] = [
  {key:"All",value:"All"},
  {key:"image",value:"Image"},
  {key:"video",value:"Video"},
  {key:"audio",value:"Audio"}
]

export default typesOfMedia;