export type Order = {
  amount: number;
};
export type Invoice = {
  customer: string;
  orders: Order[];
  dueDate: Date;
  outstanding: number;
};
