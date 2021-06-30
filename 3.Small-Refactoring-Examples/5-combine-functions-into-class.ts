export type ReadingData = {
  customer: string;
  quantity: number;
  month: number;
  year: number;
};
class Reading {
  private _customer: string;
  private _quantity: number;
  private _month: number;
  private _year: number;
  constructor(data: ReadingData) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}
const baseRate = (month: number, year: number) => {
  return year - month;
};
const taxThreshold = (year: number) => {
  return year * 1;
};
export const getChargeInfos = (rawReading: ReadingData) => {
  const aReading = new Reading(rawReading);
  return { base: aReading.baseCharge, taxable: aReading.taxableCharge };
};
