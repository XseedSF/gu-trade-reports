export const deleteAttribute = key => {
  return state => {
    const newState = Object.assign({}, state);
    delete newState[key];
    return newState;
  };
};
