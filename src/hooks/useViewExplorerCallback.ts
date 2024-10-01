import { Explorer } from '@/constants/common';
import { useCluster } from '@/context/cluster';
import { useCallback } from 'react';
import { useLocalStorageState } from './useLocalStorageState';

const useViewExplorerCallback = (txSignature?: string) => {
	const cluster = useCluster();
	const [explorer] = useLocalStorageState('EXPLORER', Explorer.SOLANA);

	return useCallback(() => {
		if (txSignature) {
			window.open(
				`${explorer ?? Explorer.SOLANA}/tx/${txSignature}?cluster=${cluster}`
			);
		}
	}, [txSignature, cluster, explorer]);
};

export default useViewExplorerCallback;
