export type OracleType = {
  title: string;
  chain: string;
  dateCreated: string;
  type: string;
  description: string;
  oracle: string;
  requester: string;
  requestedTime?: string;
  settledTime?: string;
  bond: number;
  bondMint: string;
  reward: number;
  request?: string[];
  umip?: string;
  identifier?: string;
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
