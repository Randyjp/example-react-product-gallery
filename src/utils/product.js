const sortAscending = (product1, product2) => product1.price - product2.price;

const sortDescending = (product1, product2) => product2.price - product1.price;

const alphaSort = (product1, product2) => {
  if (product1.name < product2.name) {
    return -1;
  }
  if (product1.name > product2.name) {
    return 1;
  }
  return 0;
};

const alphaSortReverse = (product1, product2) => {
  if (product1.name < product2.name) {
    return 1;
  }
  if (product1.name > product2.name) {
    return -1;
  }
  return 0;
};

export { sortAscending, sortDescending, alphaSort, alphaSortReverse };
