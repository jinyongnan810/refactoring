// p.125 変数の抽出
export type Order = {
  quantity: number;
  itemPrice: number;
};

export const price = (order: Order) => {
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)
  );
};
