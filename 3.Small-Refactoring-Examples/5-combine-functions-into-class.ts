export type ReadingData = {
  customer: string;
  quantity: number;
  month: number;
  year: number;
};
const baseRate = (month: number, year: number) => {
  return year - month;
};
const taxThreshold = (year: number) => {
  return year * 1;
};
const baseCharge = (aReading: ReadingData) => {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
};
const taxableCharge = (aReading: ReadingData) => {
  return Math.max(0, baseCharge(aReading) - taxThreshold(aReading.year));
};
export const getChargeInfos = (aReading: ReadingData) => {
  return { base: baseCharge(aReading), taxable: taxableCharge(aReading) };
};
