import '@testing-library/jest-dom/extend-expect';
import { render } from '../../../../tests';
import Footer from '../Footer';

describe('<Footer />', () => {
  test('Should component must render correctly', () => {
    const { getByTestId }: any = render(<Footer />, {});

    expect(getByTestId('footer-app')).toBeDefined();
  });
});
