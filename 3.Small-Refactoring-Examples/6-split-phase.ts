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

class Order {
  private _product: Product;
  private _quantity: number;
  private _shippingMethod: ShippingMethod;
  private _basePrice: number;
  constructor(
    product: Product,
    quantity: number,
    shippingMethod: ShippingMethod
  ) {
    this._product = product;
    this._quantity = quantity;
    this._shippingMethod = shippingMethod;
    this._basePrice = product.basePrice * quantity;
  }
  get basePrice() {
    return this._basePrice;
  }
  get discount() {
    return (
      Math.max(this._quantity - this._product.discountThreshold, 0) *
      this._product.basePrice *
      this._product.discountRate
    );
  }
  get shipping() {
    const shippingPerCase =
      this.basePrice > this._shippingMethod.discountThreshold
        ? this._shippingMethod.discountedFee
        : this._shippingMethod.feePerCase;
    return this._quantity * shippingPerCase;
  }
  get total() {
    return this.basePrice - this.discount + this.shipping;
  }
}

export const priceOrder = (
  product: Product,
  quantity: number,
  shippingMethod: ShippingMethod
) => {
  const order = new Order(product, quantity, shippingMethod);
  return order.total;
};
