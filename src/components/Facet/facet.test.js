import React from 'react';
import { fireEvent } from '@testing-library/react';

import Facet from './facet';
import { render } from '../../utils/test';
import { categories } from '../../data';

describe('<CardGrid />', () => {
  it(`renders facet with proper filter names`, () => {
    const { getAllByText } = render(<Facet categories={categories} />);

    categories.forEach(category => {
      const facetRegex = new RegExp(category.name, 'i');
      expect(getAllByText(facetRegex)[0]).toBeTruthy();
    });
  });

  it(`sets search params when user clicks on category link`, () => {
    const { getAllByText, history } = render(<Facet categories={categories} />);

    expect(history.location.search).toBe('');

    const filter = getAllByText(categories[0].name)[0];

    fireEvent.click(filter);

    expect(history.location.search).toBe(`?category=${categories[0].id}`);
  });
});
