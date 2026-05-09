import { queryClient } from '@/lib/query/client';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

type QueryProviderProps = {
  children: React.ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps): React.JSX.Element {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
