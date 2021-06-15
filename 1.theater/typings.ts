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
export type StatementData = {
  customer: string;
};
