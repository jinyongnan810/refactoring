import {
  Invoice,
  Perfomance,
  Play,
  SinglePlay,
  StatementData,
} from "./typings";

export const statement = (invoice: Invoice, plays: Play) => {
  const statementData: StatementData = {
    customer: invoice.customer,
  };
  return renderPlainText(statementData, invoice, plays);
};

export const renderPlainText = (
  data: StatementData,
  invoice: Invoice,
  plays: Play
) => {
  // play取得
  const playFor = (aPerformance: Perfomance) => {
    return plays[aPerformance.playID];
  };
  // 金額計算ロジック
  const amountFor = (aPerformance: Perfomance) => {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`Unknown type:${playFor(aPerformance).type}`);
    }
    return result;
  };
  // Point計算ロジック
  const volumeCreditsFor = (aPerformance: Perfomance) => {
    // ボリューム得点のポイントを加算
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    // 喜劇のときは10人につき、さらにポイントを加算
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  };
  // 金額フォーマットロジック
  const usd = (aAmount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aAmount / 100);
  };
  // 総ポイント集計
  const totalVolumeCredits = () => {
    let result = 0;
    for (let aPerformance of invoice.performances) {
      result += volumeCreditsFor(aPerformance);
    }
    return result;
  };
  // 総金額集計
  const totalAmount = () => {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
      let thisAmount = amountFor(perf);
      // 注文の内訳を出力
      result += `  ${playFor(perf).name}: ${usd(thisAmount)} (${
        perf.audience
      } seats)\n`;
      // 金額加算
      totalAmount += thisAmount;
    }
    return totalAmount;
  };

  let result = `Statement for ${data.customer}\n`;
  let amount = totalAmount();
  result += `Amount owed is ${usd(amount)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
};
