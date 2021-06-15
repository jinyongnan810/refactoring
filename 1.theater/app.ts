import {
  EnrichedPerformance,
  Invoice,
  Perfomance,
  Play,
  SinglePlay,
  StatementData,
} from "./typings";

export const statement = (invoice: Invoice, plays: Play) => {
  // play取得
  const playFor = (aPerformance: Perfomance) => {
    return plays[aPerformance.playID];
  };
  // 金額計算ロジック
  const amountFor = (aPerformance: EnrichedPerformance) => {
    let result = 0;
    switch (aPerformance.play.type) {
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
        throw new Error(`Unknown type:${aPerformance.play.type}`);
    }
    return result;
  };
  // Point計算ロジック
  const volumeCreditsFor = (aPerformance: EnrichedPerformance) => {
    // ボリューム得点のポイントを加算
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    // 喜劇のときは10人につき、さらにポイントを加算
    if ("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  };
  // 総ポイント集計
  const totalVolumeCredits = (data: StatementData) => {
    let result = 0;
    for (let aPerformance of data.performances) {
      result += aPerformance.volumeCredits;
    }
    return result;
  };
  // 総金額集計
  const totalAmount = (data: StatementData) => {
    let totalAmount = 0;
    for (let perf of data.performances) {
      // 金額加算
      totalAmount += perf.amount;
    }
    return totalAmount;
  };

  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map((aPerformance) => {
      const result: EnrichedPerformance = {
        ...aPerformance,
        play: playFor(aPerformance),
        amount: 0,
        volumeCredits: 0,
      };
      result.amount = amountFor(result);
      result.volumeCredits = volumeCreditsFor(result);
      return result;
    }),
    totalAmount: 0,
    totalVolumeCredits: 0,
  };
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return renderPlainText(statementData, invoice, plays);
};

export const renderPlainText = (
  data: StatementData,
  invoice: Invoice,
  plays: Play
) => {
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
  for (const aPerformance of data.performances) {
    result += `  ${aPerformance.play.name}: ${usd(aPerformance.amount)} (${
      aPerformance.audience
    } seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
};
