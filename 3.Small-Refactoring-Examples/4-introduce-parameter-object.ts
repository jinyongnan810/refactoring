type Reading = {
  temp: number;
  time: Date;
};
export type Station = {
  name: string;
  readings: Reading[];
};
export const operatingPlan = {
  temperatureFloor: 50,
  temperatureCeiling: 53,
};
export class NumberRange {
  private _data: { min: number; max: number };
  constructor(min: number, max: number) {
    this._data = { min, max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
}

export const readingsOutsideRange = (station: Station, range: NumberRange) => {
  return station.readings.filter(
    (r) => r.temp < range.min || r.temp > range.max
  );
};
