export const listOptions = (list) => {
  let updatedList = list.map((item) => {
    return { value: item.id, label: item.name }
  });
  return updatedList;
};

export const toTop = () => {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
};