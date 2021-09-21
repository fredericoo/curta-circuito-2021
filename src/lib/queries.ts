import { films } from './mocks';
import { Film } from './types';

export const getFilmSlugs = async (): Promise<string[]> => {
  const allFilms = films;
  return allFilms.map((film) => film?.slug || '').filter(Boolean);
};

export const getFilmBySlug = async (
  slug: string
): Promise<Film | undefined> => {
  const allFilms = films;
  return allFilms.find((film) => film?.slug === slug);
};

export const getFilmUrl = (slug: string): string => `/programacao/${slug}`;
