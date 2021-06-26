let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };
export const defaultOwner = () => {
  return Object.assign({}, defaultOwnerData); // prevent original data to be overwritten.
};
export const setDefaultOwner = (arg: any) => {
  defaultOwnerData = arg;
};
