import React from 'react';
import { fireEvent } from '@testing-library/react';

import CardGrid from './cardGrid';
import { render } from '../../utils/test';
import { products, categories } from '../../data';

describe('<CardGrid />', () => {
  it(`renders category name as grid's title and card`, () => {
    const titleRegex = new RegExp(categories[0].name, 'i');

    const { getByText, getAllByTestId } = render(
      <CardGrid cardsItems={products} category={categories[0]} />
    );

    expect(getByText(titleRegex)).toBeTruthy();

    const cards = getAllByTestId('card-container');

    expect(cards.length).toEqual(products.length);
  });

  it(`renders product modal`, () => {
    // append a modal-root div to the containing element
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');

    const { getAllByTestId, queryByTestId } = render(
      <CardGrid cardsItems={products} category={categories[0]} />,
      {
        container: document.body.appendChild(modalRoot),
      }
    );

    const card = getAllByTestId('card-container')[0];

    // at first, there's no modal
    expect(queryByTestId('modal-container')).toBeFalsy();
    fireEvent.click(card);
    // after clicking on a card, we have a modal
    expect(queryByTestId('modal-container')).toBeTruthy();
  });
});
