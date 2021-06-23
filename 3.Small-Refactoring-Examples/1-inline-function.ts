// p.123 関数のインライン化
export type Customer = {
  name: string;
  location: string;
};

export const reportLines = (aCustomer: Customer) => {
  const lines: string[][] = [];
  lines.push(["name", aCustomer.name]);
  lines.push(["location", aCustomer.location]);
  return lines;
};
