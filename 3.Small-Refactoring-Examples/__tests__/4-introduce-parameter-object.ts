import {
  NumberRange,
  operatingPlan,
  readingsOutsideRange,
  Station,
} from "../4-introduce-parameter-object";

describe("パラメータオブジェクトの導入", () => {
  it("normal", () => {
    const station: Station = {
      name: "ZB1",
      readings: [
        { temp: 47, time: new Date("2016-11-10 09:10") },
        { temp: 53, time: new Date("2016-11-10 09:20") },
        { temp: 58, time: new Date("2016-11-10 09:30") },
        { temp: 53, time: new Date("2016-11-10 09:40") },
        { temp: 51, time: new Date("2016-11-10 09:50") },
      ],
    };
    const range = new NumberRange(
      operatingPlan.temperatureFloor,
      operatingPlan.temperatureCeiling
    );
    const res = readingsOutsideRange(station, range);
    expect(res).toStrictEqual([
      { temp: 47, time: new Date("2016-11-10 09:10") },
      { temp: 58, time: new Date("2016-11-10 09:30") },
    ]);
  });
});
