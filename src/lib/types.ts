export type Film = {
  uid?: string;
  slug?: string;
  title: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  year?: number;
  director?: string;
  duration?: number;
  cover?: PrismicImage;
  bgColor?: string;
};

export type PrismicImage = {
  url: string;
  dimensions: {
    width: number;
    height: number;
  };
  alt?: string;
};
