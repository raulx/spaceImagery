type ApodData = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

type MarsImagesData = {
  photos: [
    {
      img_src: string;
      id: string;
      sol: string;
      earth_date: string;
      camera: { name: string };
      rover: {
        name: string;
        landing_date: string;
        launch_date: string;
        status: string;
      };
    }
  ];
};

export type { ApodData, MarsImagesData };
