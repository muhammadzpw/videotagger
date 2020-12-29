import React from 'react';

export interface FetchResult<TResult> {
  data?: TResult;
  loading?: boolean;
  error?: any;
}

const useFetch = <TResult>(apiMethod: Promise<TResult>) => {
  const [result, setResult] = React.useState<FetchResult<TResult>>({
    loading: true,
  });

  React.useEffect(() => {
    const fetchResult = async () => {
      try {
        setResult({
          loading: false,
          data: await apiMethod,
        });
      } catch (error) {
        console.error('Error while fetching API: ', error);
        setResult({ loading: false, error });
      }
    };

    if (result.loading) {
      fetchResult();
    }
  }, [apiMethod, result.loading, setResult]);

  return result;
};

export { useFetch };
