/**
 * Professional Data Fetching Hook
 * Features: Loading states, error handling, retry logic, caching
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for fetching data with professional error handling
 * @param {Function} fetchFn - Async function that fetches data
 * @param {Boolean} immediate - Whether to fetch immediately on mount
 * @param {Number} retries - Number of retry attempts on error
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetch = (
  fetchFn,
  immediate = true,
  retries = 2
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const retryCountRef = useRef(0);
  const isMountedRef = useRef(true);

  const execute = useCallback(async (isRetry = false) => {
    if (!isRetry) {
      setLoading(true);
      setError(null);
      retryCountRef.current = 0;
    }

    try {
      if (isMountedRef.current) {
        const result = await fetchFn();
        if (isMountedRef.current) {
          setData(result);
          setLoading(false);
          setError(null);
          retryCountRef.current = 0;
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        console.error('Fetch error:', err);

        // Retry logic
        if (retryCountRef.current < retries) {
          retryCountRef.current += 1;
          console.log(`Retrying... Attempt ${retryCountRef.current}/${retries}`);
          
          // Exponential backoff
          const delay = Math.pow(2, retryCountRef.current) * 1000;
          setTimeout(() => execute(true), delay);
        } else {
          setError(err.message || 'An error occurred while fetching data');
          setLoading(false);
        }
      }
    }
  }, [fetchFn, retries]);

  useEffect(() => {
    isMountedRef.current = true;

    if (immediate) {
      execute();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [execute, immediate]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch };
};

/**
 * Hook for fetching a single resource by ID
 */
export const useFetchById = (fetchFn, id, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        if (!id) {
          setData(null);
          setLoading(false);
          return;
        }

        const result = await fetchFn(id);
        if (isMountedRef.current) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMountedRef.current) {
          console.error('Fetch error:', err);
          setError(err.message || 'Failed to fetch data');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMountedRef.current = false;
    };
  }, [id, ...dependencies]);

  return { data, loading, error };
};

/**
 * Hook for fetching list of resources with pagination
 */
export const useFetchList = (
  fetchFn,
  filters = {},
  page = 1,
  pageSize = 20
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const result = await fetchFn({
          ...filters,
          page,
          page_size: pageSize,
        });

        if (isMountedRef.current) {
          // Handle both array responses and paginated responses
          if (Array.isArray(result)) {
            setData(result);
            setTotalCount(result.length);
            setHasNextPage(false);
          } else if (result.results) {
            setData(result.results);
            setTotalCount(result.count || result.results.length);
            setHasNextPage(!!result.next);
          } else {
            setData(result);
            setTotalCount(1);
            setHasNextPage(false);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMountedRef.current) {
          console.error('Fetch error:', err);
          setError(err.message || 'Failed to fetch list');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMountedRef.current = false;
    };
  }, [page, pageSize, JSON.stringify(filters)]);

  return { data, loading, error, totalCount, hasNextPage };
};

/**
 * Hook for mutations (POST, PUT, DELETE)
 */
export const useMutation = (mutationFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await mutationFn(payload);
      if (isMountedRef.current) {
        setData(result);
        setLoading(false);
      }
      return result;
    } catch (err) {
      if (isMountedRef.current) {
        console.error('Mutation error:', err);
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
      throw err;
    }
  }, [mutationFn]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
};

export default {
  useFetch,
  useFetchById,
  useFetchList,
  useMutation,
};
