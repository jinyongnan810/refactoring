import {
  EnrichedPerformance,
  Invoice,
  Perfomance,
  Play,
  SinglePlay,
  StatementData,
} from "./typings";

class PerformanceCalculator {
  public performance: Perfomance;
  public play: SinglePlay;
  constructor(aPerformance: Perfomance, aPlay: SinglePlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }
}

export const createStatementData = (invoice: Invoice, plays: Play) => {
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
    return data.performances.reduce(
      (total, aPerformance) => aPerformance.volumeCredits + total,
      0
    );
  };
  // 総金額集計
  const totalAmount = (data: StatementData) => {
    return data.performances.reduce(
      (total, aPerformance) => aPerformance.amount + total,
      0
    );
  };

  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map((aPerformance) => {
      const calculator = new PerformanceCalculator(
        aPerformance,
        playFor(aPerformance)
      );
      const result: EnrichedPerformance = {
        ...aPerformance,
        play: calculator.play,
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
  return statementData;
};
