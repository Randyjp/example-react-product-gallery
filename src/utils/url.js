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

export { addPQueryParameter };
