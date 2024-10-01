import Header from '@/components/Navigation/Header';
import { ClusterContextProvider } from '@/context/cluster';
import { ThemeContextProvider } from '@/context/ThemeProvider';
import '@/styles/fonts.css';
import { MainColorSet } from '@/theme/types';
import { Box, Flex, useTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import '../styles/globals.css';

const WalletConnectionProvider = dynamic(
	() => import('../context/WalletConnectionProvider'),
	{
		ssr: false,
	}
);

const client = new QueryClient({
	defaultOptions: {
		queries: {
			// default to conservative fetching to prevent unnecessary RPC usage
			refetchInterval: false,
			refetchOnMount: false,
		},
	},
});

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={client}>{children}</QueryClientProvider>
);

type ProvidersType = [React.ElementType, Record<string, unknown>];
type ChildrenType = {
	children: Array<React.ElementType>;
};

const buildProvidersTree = (componentsWithProps: Array<ProvidersType>) => {
	const initialComponent = ({ children }: ChildrenType) => <>{children}</>;
	return componentsWithProps.reduce(
		(
			AccumulatedComponents: React.ElementType,
			[Provider, props = {}]: ProvidersType
		) => {
			// eslint-disable-next-line react/display-name
			return ({ children }: ChildrenType) => {
				return (
					<AccumulatedComponents>
						<Provider {...props}>{children}</Provider>
					</AccumulatedComponents>
				);
			};
		},
		initialComponent
	);
};

const ProvidersTree = buildProvidersTree([
	[ThemeContextProvider, {}],
	[ClusterContextProvider, {}],
	[WalletConnectionProvider, {}],
	[ReactQueryProvider, {}],
]);

function ThemeBox({ children }: { children: ReactNode }) {
	const { colors } = useTheme();
	const { background } = colors as MainColorSet;

	return <Box bg={background}>{children}</Box>;
}

export default function App({ Component, pageProps }: AppProps) {
	const [favicon, setFavicon] = useState('/favicon-light.ico');

	return (
		<>
			<Head>
				<link rel='icon' href={favicon} />
				<title>Bright Sight</title>
			</Head>
			<ProvidersTree>
				<ThemeBox>
					<Header />
					<Flex minH='calc(100vh - 66px)'>
						<Component {...pageProps} />
					</Flex>
				</ThemeBox>
			</ProvidersTree>
		</>
	);
}
