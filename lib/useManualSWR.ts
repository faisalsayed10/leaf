import useSWR, { cache, SWRConfiguration } from "swr";

function useManualSWR<Type>(key: string, fetcher, options?: SWRConfiguration) {
  const cachedData: Type = cache.get(key);
  const {
    data: fetchData,
    mutate,
    error,
    isValidating,
  } = useSWR<Type>(!cachedData ? key : null, fetcher, {
    ...options,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false
  });

  const data = fetchData || cachedData;
  return { data, mutate, isValidating, error };
};

export default useManualSWR;
