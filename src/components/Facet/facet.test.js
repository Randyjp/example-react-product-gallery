import React from 'react';
import { fireEvent } from '@testing-library/react';

import Facet from './facet';
import { render } from '../../utils/test';
import { categories } from '../../data';
import * as requests from '../../requests';

jest.mock('../../requests', () => {
  return {
    getProducts: jest.fn(() => Promise.resolve([])),
  };
});

describe('<Facet />', () => {
  it(`renders facet with proper filter names`, () => {
    const { getAllByText } = render(<Facet categories={categories} />);

    categories.forEach(category => {
      const facetRegex = new RegExp(category.name, 'i');
      expect(getAllByText(facetRegex)[0]).toBeTruthy();
    });
  });

  it(`sets search params when user clicks on category link`, async () => {
    const { getAllByText } = render(<Facet categories={categories} />);

    const filter = getAllByText(categories[1].name)[0];
    fireEvent.click(filter);

    expect(requests.getProducts.mock.calls.length).toBe(3);
    expect(requests.getProducts).toHaveBeenCalledWith({
      categoryId: categories[1].id,
      maxPrice: undefined,
      minPrice: undefined,
      searchText: '',
    });

    requests.getProducts.mockReset();
  });
});
