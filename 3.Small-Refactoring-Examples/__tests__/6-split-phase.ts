import { priceOrder, Product, ShippingMethod } from "../6-split-phase";

describe("フェーズの分離", () => {
  it("under shipping discount", () => {
    const aProduct: Product = {
      basePrice: 10,
      discountRate: 0.1,
      discountThreshold: 100,
    };
    const aShippingMethod: ShippingMethod = {
      feePerCase: 3,
      discountedFee: 2,
      discountThreshold: 2000,
    };
    const res = priceOrder(aProduct, 150, aShippingMethod);
    expect(res).toEqual(1500 - 50 + 450);
  });

  it("over shipping discount", () => {
    const aProduct: Product = {
      basePrice: 10,
      discountRate: 0.1,
      discountThreshold: 100,
    };
    const aShippingMethod: ShippingMethod = {
      feePerCase: 3,
      discountedFee: 2,
      discountThreshold: 2000,
    };
    const res = priceOrder(aProduct, 250, aShippingMethod);
    expect(res).toEqual(2500 - 150 + 500);
  });
});
