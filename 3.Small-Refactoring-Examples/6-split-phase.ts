export type Product = {
  basePrice: number;
  discountThreshold: number;
  discountRate: number;
};
export type ShippingMethod = {
  discountThreshold: number;
  discountedFee: number;
  feePerCase: number;
};
export type PriceData = {
  basePrice: number;
  quantity: number;
};

export const priceOrder = (
  product: Product,
  quantity: number,
  shippingMethod: ShippingMethod
) => {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const priceData: PriceData = { basePrice, quantity };
  const price = basePrice - discount + applyShipping(priceData, shippingMethod);
  return price;
};
const applyShipping = (
  priceData: PriceData,
  shippingMethod: ShippingMethod
) => {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  return priceData.quantity * shippingPerCase;
};
