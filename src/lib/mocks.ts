import { Film } from './types';

export const films: Film[] = [
  {
    cover: {
      url: 'https://placekitten.com/500/500',
      dimensions: { width: 500, height: 500 },
    },
    title: 'Bete Balanço',
    bgColor: 'pink-800',
    startDate: new Date('2022-01-01').toDateString(),
    endDate: new Date('2022-01-01').toDateString(),
  },
  {
    cover: {
      url: 'https://placekitten.com/400/400',
      dimensions: { width: 500, height: 500 },
    },
    title: 'The Best of The Best',
    bgColor: 'red-600',
    startDate: new Date('2021-09-01').toDateString(),
    endDate: new Date('2022-01-01').toISOString(),
  },
  {
    cover: {
      url: 'https://placekitten.com/300/300',
      dimensions: { width: 500, height: 500 },
    },
    title: 'Random name',
    bgColor: 'yellow-600',
  },
  {
    cover: {
      url: 'https://placekitten.com/600/600',
      dimensions: { width: 500, height: 500 },
    },
    title: 'Test',
    bgColor: 'blue-300',
  },
  {
    cover: {
      url: 'https://placekitten.com/700/700',
      dimensions: { width: 500, height: 500 },
    },
    title: 'Test name',
    bgColor: 'pink-200',
  },
  {
    cover: {
      url: 'https://placekitten.com/800/800',
      dimensions: { width: 500, height: 500 },
    },
    title: 'Bete Balanço 2',
    bgColor: 'pink-800',
  },
  {
    cover: {
      url: 'https://placekitten.com/900/900',
      dimensions: { width: 500, height: 500 },
    },
    title: 'The Best of The Best 3',
    bgColor: 'red-600',
  },
  {
    title: 'Random name 2',
    bgColor: 'yellow-600',
  },
  {
    title: 'Test 2',
    bgColor: 'blue-300',
  },
  {
    title: 'Test name 45',
    bgColor: 'pink-200',
  },
];
