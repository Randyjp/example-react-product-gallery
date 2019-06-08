import React from 'react';
import { fireEvent } from '@testing-library/react';

import Card from './card';
import { render } from '../../utils/test';
import { products } from '../../data';

const productFixture = {
  ...products[0],
};

describe('<Card />', () => {
  it(`render product card with proper elements`, () => {
    const nameRegex = new RegExp(productFixture.name, 'i');

    const { getByText, getByAltText, getByTestId } = render(
      <Card item={productFixture} />
    );

    expect(getByTestId('card-container')).toHaveAttribute(
      'href',
      `/products?productId=${productFixture.id}`
    );
    expect(getByTestId('product-price')).toHaveTextContent(
      `$${productFixture.price}`
    );
    expect(getByText(nameRegex)).toBeTruthy();
    expect(getByAltText(nameRegex)).toBeTruthy();
  });

  it(`sets proper URL location on click`, () => {
    const { getByTestId, history } = render(<Card item={productFixture} />);
    const card = getByTestId('card-container');

    expect(history.location.search).toBe('');

    fireEvent.click(card);

    expect(history.location.search).toBe(`?productId=${productFixture.id}`);
  });
});
