import { useQuery, useMutation } from '@tanstack/react-query';

export function useRequestSessionInfo() {

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
      ...options
    });
  }

  return { query, mutation };
}
