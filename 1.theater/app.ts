import { Invoice, Play, StatementData } from "./typings";
import { createStatementData } from "./createStatementData";

export const statement = (invoice: Invoice, plays: Play) => {
  return renderPlainText(createStatementData(invoice, plays));
};
export const htmlStatement = (invoice: Invoice, plays: Play) => {
  return renderHtml(createStatementData(invoice, plays));
};

// 金額フォーマットロジック
const usd = (aAmount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aAmount / 100);
};

const renderPlainText = (data: StatementData) => {
  let result = `Statement for ${data.customer}\n`;
  // 注文の内訳を出力
  data.performances.forEach((aPerformance) => {
    result += `  ${aPerformance.play.name}: ${usd(aPerformance.amount)} (${
      aPerformance.audience
    } seats)\n`;
  });
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
};

const renderHtml = (data: StatementData) => {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  // 注文の内訳を出力
  result += "<table>\n";
  result += "<tr><th>Play</th><th>Seats</th><th>Cost</th></tr>";
  data.performances.forEach((aPerformance) => {
    result += `<tr><td>${aPerformance.play.name}</td><td>${usd(
      aPerformance.amount
    )}</td><td>${aPerformance.audience}</td></tr>\n`;
  });
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
};
