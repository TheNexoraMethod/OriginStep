import { QueryClient } from '@tanstack/react-query';

// Single shared QueryClient instance.
// staleTime: 5 minutes — data is considered fresh for 5 minutes before a background refetch.
// gcTime: 30 minutes — inactive queries are held in cache for 30 minutes before garbage collection.
// retry: 2 — failed queries retry twice before surfacing an error state.
// refetchOnWindowFocus: false — React Native has no window focus concept; disabling avoids spurious refetches.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
