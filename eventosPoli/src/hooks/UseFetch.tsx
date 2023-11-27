import { useState, useEffect } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState<[]>([]);	
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
};