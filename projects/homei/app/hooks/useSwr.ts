import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useSwr = (url?: string) => {
  const { data, isLoading, error } = useSWR(
    "http://localhost:3000/api" + url,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
};

export default useSwr;
