export * from "./dates";
export { default as exportExcel } from "./excel";

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

export const stringToArrayBuffer = value => {
  var buffer = new ArrayBuffer(value.length);
  var view = new Uint8Array(buffer);
  for (var i = 0; i != value.length; ++i) view[i] = value.charCodeAt(i) & 0xff;
  return buffer;
};
