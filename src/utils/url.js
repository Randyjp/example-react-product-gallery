function addPQueryParameter(location, params) {
  const urlParams = new URLSearchParams(location.search);
  Object.keys(params).forEach(name => {
    urlParams.set(name, params[name]);
  });
  const search = `?${urlParams.toString()}`;

  return search;
}

export {addPQueryParameter};
