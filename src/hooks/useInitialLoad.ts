import { useState, useEffect } from "react";

export const useInitialLoad = (delay = 1000) => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setInitialLoad(false);
    }, delay);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  return initialLoad;
};

