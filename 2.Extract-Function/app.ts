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
  printBanner();
  // calculate outstanding
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  invoice.outstanding = outstanding;

  // record due date
  recordDueDate(invoice);
  // print details
  printDetails(invoice, outstanding);

  return invoice;
};
