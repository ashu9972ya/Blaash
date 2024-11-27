import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseApiOptions<T> {
  initialData?: T;
  manual?: boolean; 
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (config?: AxiosRequestConfig) => Promise<void>;
}

export const useApi = <T>(
  url: string,
  options?: UseApiOptions<T>
): UseApiResult<T> => {
  const { initialData = null, manual = false } = options || {};
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (config?: AxiosRequestConfig) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios({
          url,
          method: config?.method || "GET",
          ...config,
        });
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [fetchData, manual]);

  return { data, loading, error, fetchData };
};
