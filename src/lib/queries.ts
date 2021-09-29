import { Client } from './client';
import { Film, PrismicLink } from './types';
import Prismic from '@prismicio/client';
import { Document } from '@prismicio/client/types/documents';
import { QueryOptions } from '@prismicio/client/types/ResolvedApi';

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

export const getPage = async (type: string, options: QueryOptions = {}): Promise<Document> => {
  return await Client().getSingle(type, options);
};

export const resolveDocumentURL = (link: PrismicLink): string => {
  if (link.link_type === 'Web') return link.url || '';
  if (link.link_type === 'Media') return link.url || '';
  switch (link.type) {
    case 'home':
      return `/`;
    case 'filme':
      return `/programacao/${link.uid}`;
    default:
      return `/${link.uid}`;
  }
};
