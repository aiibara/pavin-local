import { render } from '@testing-library/react-native';
import GProductCard from './GProductCard';

test('form submits two answers', async () => {
  const { getByText } = render(
    <GProductCard name={'abc'} imageUrl={''} prices={[]} />
  );

  expect(getByText('abc')).toBeTruthy();
});
