import { getChargeInfos, ReadingData } from "../5-combine-functions-into-class";

describe("関数群のクラスへの集約", () => {
  it("normal", () => {
    const aReading: ReadingData = {
      customer: "jack",
      quantity: 10,
      month: 7,
      year: 2017,
    };
    const res = getChargeInfos(aReading);
    const expectedRes = { base: 20100, taxable: 20100 - 2017 };
    expect(res).toStrictEqual(expectedRes);
  });
});
