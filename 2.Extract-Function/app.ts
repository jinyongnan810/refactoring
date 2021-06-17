import { Invoice } from "./typings";

export const printOwing = (invoice: Invoice) => {
  const printBanner = () => {
    console.log("**************************************");
    console.log("**********  Customer Owes  ***********");
    console.log("**************************************");
  };
  const printDetails = (invoice: Invoice, outstanding: number) => {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
  };
  const recordDueDate = (invoice: Invoice) => {
    const today = new Date();
    invoice.dueDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 30
    );
  };
  const calculateOutstanding = (invoice: Invoice) => {
    let result = 0;
    for (const o of invoice.orders) {
      result += o.amount;
    }
    invoice.outstanding = result;
    return result;
  };

  printBanner();
  // calculate outstanding
  const outstanding = calculateOutstanding(invoice);

  // record due date
  recordDueDate(invoice);
  // print details
  printDetails(invoice, outstanding);

  return invoice;
};
