/* eslint-disable */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useRequestProcessor() {
  const queryClient = useQueryClient();
  function query(key: any, queryFunction: any, options = {}) {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  function mutation(key: any, mutationFunction: any, options = {}) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      ...options,
      onSuccess: () => queryClient.invalidateQueries(key),
    });
  }

  return { query, mutation };
}
