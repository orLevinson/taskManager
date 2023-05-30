import { ReactNode, useState } from "react";
import loadingCtx from "./loadingCtx";

const LoadingContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <loadingCtx.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </loadingCtx.Provider>
  );
};

export default LoadingContextProvider;
