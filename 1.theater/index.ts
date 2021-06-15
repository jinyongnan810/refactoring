import { htmlStatement, statement } from "./app";
import { playData, invoiceData } from "./data";

const result = statement(invoiceData[0], playData);
console.log(result);
console.log("----------------------------");
const htmlResult = htmlStatement(invoiceData[0], playData);
console.log(htmlResult);
