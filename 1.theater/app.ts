import { Invoice, Play, StatementData } from "./typings";
import { createStatementData } from "./createStatementData";

export const statement = (invoice: Invoice, plays: Play) => {
  return renderPlainText(createStatementData(invoice, plays));
};

export const renderPlainText = (data: StatementData) => {
  // 金額フォーマットロジック
  const usd = (aAmount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aAmount / 100);
  };

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
