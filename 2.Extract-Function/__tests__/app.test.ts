import { printOwing } from "../app";
import { Invoice } from "../typings";

describe("extract-function", () => {
  test("normal", () => {
    const clgMock = jest.fn();
    console.log = clgMock;
    const invoice: Invoice = {
      customer: "testCustomer",
      orders: [{ amount: 123 }, { amount: 456 }],
      dueDate: new Date("1970-1-1"),
      outstanding: 0,
    };
    const today = new Date();
    const expectedDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 30
    );
    const invoiceExpected: Invoice = {
      customer: "testCustomer",
      orders: [{ amount: 123 }, { amount: 456 }],
      dueDate: expectedDate,
      outstanding: 579,
    };
    const res = printOwing(invoice);
    expect(res).toStrictEqual(invoiceExpected);
    expect(clgMock.mock.calls.length).toEqual(6);
    expect(clgMock.mock.calls[0]).toEqual([
      "**************************************",
    ]);
    expect(clgMock.mock.calls[1]).toEqual([
      "**********  Customer Owes  ***********",
    ]);
    expect(clgMock.mock.calls[2]).toEqual([
      "**************************************",
    ]);
    expect(clgMock.mock.calls[3]).toEqual([`name: ${invoice.customer}`]);
    expect(clgMock.mock.calls[4]).toEqual([
      `amount: ${invoiceExpected.outstanding}`,
    ]);
    expect(clgMock.mock.calls[5]).toEqual([
      `due: ${expectedDate.toLocaleDateString()}`,
    ]);
  });
});
