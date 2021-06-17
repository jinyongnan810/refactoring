import { Invoice } from "./typings";

export const printOwing = (invoice: Invoice) => {
  let outstanding = 0;
  console.log("**************************************");
  console.log("**********  Customer Owes  ***********");
  console.log("**************************************");
  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  invoice.outstanding = outstanding;

  // record due date
  const today = new Date();
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
  return invoice;
};
