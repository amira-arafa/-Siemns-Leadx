export const listOptions = (list) => {
  let updatedList = list.map((item) => {
    return { value: item.id, label: item.name }
  });
  return updatedList;
};
