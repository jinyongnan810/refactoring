// p.125 変数の抽出
export type Order = {
  quantity: number;
  itemPrice: number;
};

export const price = (order: Order) => {
  const totalPrice = order.quantity * order.itemPrice;
  const discount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(totalPrice * 0.1, 100);
  return totalPrice - discount + shipping;
};
