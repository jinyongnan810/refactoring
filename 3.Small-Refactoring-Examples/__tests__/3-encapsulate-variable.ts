import { defaultOwner, setDefaultOwner } from "../3-encapsulate-variable";

describe("変数のカプセル化", () => {
  it("normal", () => {
    // get
    expect(defaultOwner()).toEqual({ firstName: "Martin", lastName: "Fowler" });
    // set
    setDefaultOwner({ firstName: "Jack", lastName: "Bauer" });
    expect(defaultOwner()).toEqual({ firstName: "Jack", lastName: "Bauer" });
  });
});
