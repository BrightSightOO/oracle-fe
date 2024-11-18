import { Account, AccountLayout, AccountState } from '@solana/spl-token';
import { AccountInfo, PublicKey } from '@solana/web3.js';

export function loadToken(
  address: PublicKey,
  info: AccountInfo<Buffer>,
): Account {
  const rawAccount = AccountLayout.decode(info.data);
  return {
    address,
    mint: rawAccount.mint,
    owner: rawAccount.owner,
    amount: rawAccount.amount,
    delegate: rawAccount.delegateOption ? rawAccount.delegate : null,
    delegatedAmount: rawAccount.delegatedAmount,
    isInitialized: rawAccount.state !== AccountState.Uninitialized,
    isFrozen: rawAccount.state === AccountState.Frozen,
    isNative: !!rawAccount.isNativeOption,
    rentExemptReserve: rawAccount.isNativeOption ? rawAccount.isNative : null,
    closeAuthority: rawAccount.closeAuthorityOption
      ? rawAccount.closeAuthority
      : null,
    tlvData: info.data,
  };
}
