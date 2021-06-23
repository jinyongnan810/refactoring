import { Customer, reportLines } from "../1-inline-function";

describe("関数のインライン化", () => {
  it("normal", () => {
    const aCustomer: Customer = {
      name: "Jack",
      location: "New York",
    };
    const res = reportLines(aCustomer);
    const expectedRes = [
      ["name", "Jack"],
      ["location", "New York"],
    ];
    expect(res).toStrictEqual(expectedRes);
  });
});
