import { render } from '@testing-library/react';
import TimeCounter from './TimeCounter';

describe('A component that displays difference in time in a human format', () => {
  it('returns a difference in days if more than one day difference', () => {
    const { getByText } = render(
      <TimeCounter from={new Date('2017-03-01')} to={new Date('2017-03-04')} />
    );
    expect(getByText('3 dias')).toBeTruthy();
  });

  it('returns a difference in hh:mm:ss if the difference is under a day', () => {
    const { getByText } = render(
      <TimeCounter
        from={new Date('2017-03-01 16:00:00')}
        to={new Date('2017-03-01 16:12:34')}
      />
    );
    expect(getByText('00:12:34')).toBeTruthy();
  });
});
