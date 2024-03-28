import type { UmiPlugin } from "@metaplex-foundation/umi";

import { createOptimisticOracleProgram } from "./generated";

export const optimisticOracle = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createOptimisticOracleProgram(), false);
  },
});
