import { useUmi } from "@/context/UmiProvider";
import { findOracleV1Pda, getOracleV1AccountDataSerializer, OracleV1 } from "@/program-sdks/oracle";
import { useAccount } from "./account";

export function useOracle(): OracleV1 {
  const umi = useUmi();

  const [oraclePda] = findOracleV1Pda(umi);
  const oracle = useAccount(oraclePda, getOracleV1AccountDataSerializer);

  if (oracle === undefined) {
    throw new Error("Oracle account does not exist");
  }

  return oracle;
}
