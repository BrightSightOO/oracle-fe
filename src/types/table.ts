export type OracleType = {
  title: string;
  chain: string;
  dateCreated: string;
  type: string;
  description: string;
  string: string;
  oracle: string;
  requestedTime?: string;
  settledTime?: string;
  bond?: string;
  reward?: string;
  request?: string[];
  umip?: string;
  identifier?: string;
  requester?: string;
  requestTxn?: string;
  settled?: string | null;
  asserter?: string;
  escalationManager?: string;
  callbackRecipient?: string;
  caller?: string;
  assertionTxn?: string;
  settlementRecipient?: string;
  settlementTxn?: string;
  voteStatus?: string | null;
};

export enum TableDataEnum {
  Proposal = 'Proposal',
  Settled = 'Settled',
  Vote = 'Vote',
}
