import { isBefore } from 'date-fns';
import { Film } from './types';

const orderFilms = (films: Film[]): Film[] => {
  const orderedFilms = films.sort((a, b) => {
    if (!a.data.startdate || !b.data.startdate) return 0;
    const aDate = new Date(a.data.startdate);
    const bDate = new Date(b.data.startdate);
    return isBefore(aDate, bDate) ? -1 : 1;
  });
  const airedFilms = orderedFilms.filter(
    (film) => !film.data.enddate || !film.data.startdate || isBefore(new Date(film.data.enddate), new Date())
  );
  const airingFilms = orderedFilms.filter(
    (film) => film.data.enddate && film.data.startdate && !isBefore(new Date(film.data.enddate), new Date())
  );

  return [...airingFilms, ...airedFilms];
};

export default orderFilms;
