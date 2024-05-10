import { render } from '@testing-library/react-native';
import ProductCard from './ProductCard';

test('form submits two answers', async () => {
  const { getByText } = render(
    <ProductCard name={'abc'} imageUrl={''} prices={[]} />
  );

  expect(getByText('abc')).toBeTruthy();
});
