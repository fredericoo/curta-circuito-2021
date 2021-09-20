import Home from '@/pages';
import { render } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { ReactElement } from 'react';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} />
));
jest.mock(
  'next/head',
  () =>
    function Head({ children }: { children: ReactElement }) {
      return <>{children}</>;
    }
);

describe(`<Home />`, () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it(`should render`, () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });
});
