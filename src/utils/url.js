import queryString from 'query-string';
import * as requests from '../requests';

function addPQueryParameter(location, params) {
  const urlParams = new URLSearchParams(location.search);
  Object.keys(params).forEach(name => {
    if (params[name]) {
      urlParams.set(name, params[name]);
    } else {
      urlParams.delete(name);
    }
  });
  const search = `?${urlParams.toString()}`;

  return search;
}

function stringToInt(NumberString) {
  return Number.parseInt(NumberString, 10) || undefined;
}

function getUrlParams(search) {
  const qs = queryString.parse(search);

  const { searchText } = qs;
  // const productId = stringToInt(qs.productId);
  const categoryId = stringToInt(qs.category) || 1;
  const minPrice = stringToInt(qs.minPrice);
  const maxPrice = stringToInt(qs.maxPrice);

  return {
    // productId,
    categoryId,
    minPrice,
    maxPrice,
    searchText,
  };
}

function didFilterParamsChange(location = window.location.search, prevObject) {
  // const prevObject = {
  //   categoryId: selectedCategory,
  //   searchText: textFilter,
  //   ...priceFilters,
  // };
  // console.log(queryObject);
  // const currentObject = {
  //   categoryId: queryObject.category,
  //   searchText: queryObject.searchText,
  //   minPrice: queryObject.minPrice,
  //   maxPrice: queryObject.maxPrice,
  // };

  const currentObject = getUrlParams(location);

  // console.log(queryString.stringify(currentObject));
  // console.log(queryString.stringify(prevObject));
  return (
    queryString.stringify(prevObject) !== queryString.stringify(currentObject)
  );
}

async function requestProducts(filters) {
  const products = await requests.getProducts(filters);
  return products;
}

export {
  addPQueryParameter,
  didFilterParamsChange,
  requestProducts,
  getUrlParams,
};
