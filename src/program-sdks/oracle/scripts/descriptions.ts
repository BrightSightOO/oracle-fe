import { ParimutuelMarketSchema, getPredictionMarketInfo } from '@/data/ipfs';

export async function getDescription(
  hash: string,
): Promise<ParimutuelMarketSchema | null> {
  return getPredictionMarketInfo(hash).catch(() => null);
}

export async function getDescriptions(
  hashList: Array<{ key: string; hash: string }>,
): Promise<Record<string, ParimutuelMarketSchema>> {
  const descriptions: Record<string, ParimutuelMarketSchema> = {};

  for (const item of hashList) {
    const description = await getDescription(item.hash);
    if (description && description.showPublic) {
      descriptions[item.key] = description;
    }
  }
  return descriptions;
}
