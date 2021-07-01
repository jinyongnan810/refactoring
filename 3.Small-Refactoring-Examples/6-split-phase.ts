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
  const basePrice = applyBasePrice(product, quantity);
  const discount = applyDiscount(product, quantity);
  const shipping = applyShipping({ basePrice, quantity }, shippingMethod);
  const price = basePrice - discount + shipping;
  return price;
};
const applyBasePrice = (product: Product, quantity: number) => {
  return product.basePrice * quantity;
};
const applyDiscount = (product: Product, quantity: number) => {
  return (
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate
  );
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
