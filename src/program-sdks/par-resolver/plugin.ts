import type { UmiPlugin } from "@metaplex-foundation/umi";

import { createParimutuelResolverProgram } from "./generated";

export const parimutuelResolver = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createParimutuelResolverProgram(), false);
  },
});
