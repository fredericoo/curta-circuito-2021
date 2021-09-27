import { Client } from './client';
import { Film, PrismicLink } from './types';
import Prismic from '@prismicio/client';
import { Document } from '@prismicio/client/types/documents';

export const getFilmSlugs = async (): Promise<string[]> => {
  const allFilms = await Client().query(Prismic.Predicates.at('document.type', 'filme'), { fetch: ['uid'] });
  return allFilms.results.map((film) => film.uid || '').filter(Boolean);
};

export const getAllFilms = async (): Promise<Film[]> => {
  const allFilms = await Client().query(Prismic.Predicates.at('document.type', 'filme'), {
    orderings: '[my.filme.startdate]',
  });
  return (allFilms.results || []) as Film[];
};

export const getFilmBySlug = async (slug: string): Promise<Film | undefined> => {
  const query = (await Client().getByUID('filme', slug, {})) as Film;
  return query;
};

export const getPage = async (type: string): Promise<Document> => {
  return await Client().getSingle(type, {});
};

export const resolveDocumentURL = (link: PrismicLink): string => {
  if ('link_type' in link) return link.url || '';
  switch (link.type) {
    case 'home':
      return `/`;
    case 'filme':
      return `/programacao/${link.uid}`;
    default:
      return `/${link.uid}`;
  }
};
