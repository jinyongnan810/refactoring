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
    switch (this.play.type) {
      case "tragedy":
        throw new Error("Not supposed to be called in here but in subclass");
      case "comedy":
        throw new Error("Not supposed to be called in here but in subclass");
      default:
        throw new Error(`Unknown type:${this.play.type}`);
    }
    return 0;
  }
  // Point計算ロジック
  get volumeCredit() {
    // ボリューム得点のポイントを加算
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    return result;
  }
}

class ComedyPerformanceCalculator extends PerformanceCalculator {
  constructor(aPerformance: Perfomance, aPlay: SinglePlay) {
    super(aPerformance, aPlay);
  }
  // 金額計算ロジック
  get amount() {
    let result = 0;
    result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
  // Point計算ロジック
  get volumeCredit() {
    // ボリューム得点のポイントを加算
    // super.volumeCreditを使いたいが、typescriptでは使えないらしい、強いて使っても予想外の結果になる
    // Ref:https://stackoverflow.com/questions/50283360/typescript-error-ts2340-public-methods-accessible-via-super-keyword
    return (
      <PerformanceCalculator["volumeCredit"]>(
        Reflect.get(PerformanceCalculator.prototype, "volumeCredit", this)
      ) + Math.floor(this.performance.audience / 5)
    );
  }
}

class TragedyPerformanceCalculator extends PerformanceCalculator {
  constructor(aPerformance: Perfomance, aPlay: SinglePlay) {
    super(aPerformance, aPlay);
  }
  // 金額計算ロジック
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
  // Point計算ロジック(superと同様)
}

const createPerformanceCalculator = (
  aPerformance: Perfomance,
  aPlay: SinglePlay
) => {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyPerformanceCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyPerformanceCalculator(aPerformance, aPlay);
    default:
      throw new Error("Unrecognized type.");
  }
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
