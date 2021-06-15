export type PlayType = "comedy" | "tragedy";
export type Play = {
  [playname: string]: {
    name: string;
    type: PlayType;
  };
};
export type SinglePlay = {
  name: string;
  type: PlayType;
};
export type Perfomance = {
  playID: string;
  audience: number;
};
export type Invoice = {
  customer: string;
  performances: Perfomance[];
};
export type EnrichedPerformance = Perfomance & {
  play: SinglePlay;
  amount: number;
  volumeCredits: number;
};
export type StatementData = {
  customer: string;
  performances: EnrichedPerformance[];
  totalAmount: number;
  totalVolumeCredits: number;
};
