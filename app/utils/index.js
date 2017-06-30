export * from "./dates";

export const deleteAttribute = key => {
  return object => {
    const newObject = Object.assign({}, object);
    delete newObject[key];
    return newObject;
  };
};

export const dictionaryToArray = dictionary => {
  const keys = Object.keys(dictionary);
  return keys.map(key => dictionary[key]);
};
