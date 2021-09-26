import type { RichTextBlock } from 'prismic-reactjs';
import type { Document } from '@prismicio/client/types/documents';

export type Film = Omit<Document, 'type' | 'data'> & {
  type: 'filme';
  data: {
    title?: RichTextBlock[];
    bgcolor?: string;
    cover?: PrismicImage;
    startdate?: string;
    enddate?: string;
    description?: RichTextBlock[];
    year?: number;
    director?: string;
    duration?: number;
    trailer?: PrismicWebLink;
    review_title?: RichTextBlock[];
    review_text?: RichTextBlock[];
    review_book?: PrismicWebLink;
    review_link?: PrismicWebLink;
    interview_title?: RichTextBlock[];
    interview_text?: RichTextBlock[];
    interview_image?: PrismicImage;
    interview_youtube?: PrismicWebLink;
    interview_spotify?: PrismicWebLink;
    carousel?: PrismicImage[];
    image?: PrismicImage[];
    seo_title?: string;
    seo_desc?: string;
    seo_img?: PrismicImage;
  };
};

export type PrismicImage = {
  url: string;
  dimensions: {
    width: number;
    height: number;
  };
  alt?: string;
};

export type PrismicDocumentLink = {
  type: string;
  uid?: string;
};

export type PrismicWebLink = {
  link_type: 'Web';
  url: string;
};
export type PrismicLink = PrismicDocumentLink | PrismicWebLink;
