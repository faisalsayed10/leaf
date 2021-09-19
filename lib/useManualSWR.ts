import useSWR, { SWRConfiguration, useSWRConfig } from "swr";

function useManualSWR<Type>(key: string, options?: SWRConfiguration) {
  const { cache } = useSWRConfig();
  const cachedData: Type = cache.get(key);
  const {
    data: fetchData,
    mutate,
    error,
    isValidating,
  } = useSWR<Type>(!cachedData ? key : null, {
    ...options,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false
  });

  const data = fetchData || cachedData;
  return { data, mutate, isValidating, error };
};

export default useManualSWR;
