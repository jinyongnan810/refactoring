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

export const readingsOutsideRange = (
  station: Station,
  min: number,
  max: number
) => {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
};
