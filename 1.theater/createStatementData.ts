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
  // 金額計算ロジック
  get amount() {
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`Unknown type:${this.play.type}`);
    }
    return result;
  }
  // Point計算ロジック
  get volumeCredit() {
    // ボリューム得点のポイントを加算
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    // 喜劇のときは10人につき、さらにポイントを加算
    if ("comedy" === this.play.type)
      result += Math.floor(this.performance.audience / 5);
    return result;
  }
}

const createPerformanceCalculator = (
  aPerformance: Perfomance,
  aPlay: SinglePlay
) => {
  return new PerformanceCalculator(aPerformance, aPlay);
};

export const createStatementData = (invoice: Invoice, plays: Play) => {
  // play取得
  const playFor = (aPerformance: Perfomance) => {
    return plays[aPerformance.playID];
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
      const calculator = createPerformanceCalculator(
        aPerformance,
        playFor(aPerformance)
      );
      const result: EnrichedPerformance = {
        ...aPerformance,
        play: calculator.play,
        amount: calculator.amount,
        volumeCredits: calculator.volumeCredit,
      };
      return result;
    }),
    totalAmount: 0,
    totalVolumeCredits: 0,
  };
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;
};
