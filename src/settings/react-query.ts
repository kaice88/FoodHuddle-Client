import { useMutation, useQuery } from '@tanstack/react-query'

export function useRequestProcessor() {
  function query<D, E>(key: any, queryFunction: any, options = {}) {
    return useQuery<D, E>({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    })
  }

  function mutation<MutationResponseData, E, MutationData>(
    key: any,
    mutationFunction: any,
    options = {},
  ) {
    return useMutation<MutationResponseData, E, MutationData>({
      mutationKey: key,
      mutationFn: mutationFunction,
      ...options,
    })
  }

  return { query, mutation }
}
