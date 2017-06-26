export const deleteAttribute = key => {
  return state => {
    const newState = Object.assign({}, state);
    delete newState[key];
    return newState;
  };
};

export const dictionaryToArray = dictionary => {
  const keys = Object.keys(dictionary);
  return keys.map(key => dictionary[key]);
};
