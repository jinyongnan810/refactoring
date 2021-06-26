import { defaultOwner } from "../3-encapsulate-variable";

describe("変数のカプセル化", () => {
  it("normal", () => {
    // get
    expect(defaultOwner).toEqual({ firstName: "Martin", lastName: "Fowler" });
  });
});
