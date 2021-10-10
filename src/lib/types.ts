import type { RichTextBlock } from 'prismic-reactjs';
import type { Document } from '@prismicio/client/types/documents';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NextRoute<T = Record<string, unknown>> = React.VFC<T> & { Navbar?: React.VFC<any> };

export type Film = Omit<Document, 'type' | 'data'> &
  PrismicDocumentLink & {
    type: 'filme';
    data: {
      title?: RichTextBlock[];
      bgcolor?: string;
      tablecolor?: string;
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
      carousel?: { image: PrismicImage }[];
      image?: PrismicImage;
      seo_title?: string;
      seo_desc?: string;
      seo_img?: PrismicImage;
      player?: string;
    };
  };

export type Sponsor = { sponsor_logo?: PrismicImage; sponsor_type?: string };

export type Config = {
  staff?: { role?: string; name?: string }[];
  sponsor?: Sponsor[];
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
  link_type: 'Document';
  type: string;
  uid?: string;
  url?: never;
};

export type PrismicWebLink = {
  link_type: 'Web';
  type?: never;
  url?: string;
  uid?: never;
};

export type PrismicMediaLink = {
  link_type: 'Media';
  type?: never;
  url?: string;
  uid?: never;
};

export type PrismicLink = PrismicDocumentLink | PrismicWebLink | PrismicMediaLink;
