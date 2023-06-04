import { createContext } from "react";

const loadingCtx = createContext<{
  loading: boolean;
  setLoading: (state: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}>({
  loading: false,
  setLoading: (_state) => {},
  error: null,
  setError: (_error) => {},
});

export default loadingCtx;
