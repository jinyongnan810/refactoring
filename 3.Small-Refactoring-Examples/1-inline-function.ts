// p.123 関数のインライン化
export type Customer = {
  name: string;
  location: string;
};

export const reportLines = (aCustomer: Customer) => {
  const lines: string[][] = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
};
const gatherCustomerData = (out: string[][], aCustomer: Customer) => {
  out.push(["name", aCustomer.name]);
  out.push(["location", aCustomer.location]);
};
