import React from 'react';
import { fireEvent } from '@testing-library/react';

import ProductModal from './productModal';
import { render } from '../../utils/test';
import { products } from '../../data';

describe('<ProductModal/>', () => {
  it(`renders product details on modal`, () => {
    const nameRegex = new RegExp(products[0].name, 'i');
    const descriptionRegex = new RegExp(products[0].description, 'i');

    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');

    const { getByText, getByAltText, getByTestId } = render(
      <ProductModal product={products[0]} closeCallBack={() => {}} />,
      {
        container: document.body.appendChild(modalRoot),
      }
    );

    expect(getByAltText(nameRegex)).toBeTruthy();
    expect(getByText(descriptionRegex)).toBeTruthy();
    expect(getByTestId('modal-title')).toHaveTextContent(products[0].name);
    expect(getByTestId('modal-price')).toHaveTextContent(
      `$${products[0].price}`
    );
  });
});
