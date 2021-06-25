import { price, Order } from "../2-extract-variable";

describe("変数の抽出", () => {
  it("normal", () => {
    const order: Order = {
      quantity: 501,
      itemPrice: 10,
    };
    const res = price(order);
    expect(res).toEqual(5010 - 0.5 + 100);
  });
});
