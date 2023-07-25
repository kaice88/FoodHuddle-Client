import { useMutation, useQuery } from '@tanstack/react-query'

export function useRequestProcessor() {
  function query(key: any, queryFunction: any, options = {}) {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    })
  }

  function mutation(key: any, mutationFunction: any, options = {}) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      ...options,
    })
  }

  return { query, mutation }
}
