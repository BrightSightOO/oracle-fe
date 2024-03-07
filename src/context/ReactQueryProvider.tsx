import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // default to conservative fetching to prevent unnecessary RPC usage
      refetchInterval: false,
      refetchOnMount: false,
    },
  },
});

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
