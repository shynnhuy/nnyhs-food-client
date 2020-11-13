import React, { createContext, useCallback } from "react";
import { useDispatch } from "react-redux";

const StableDispatchContext = createContext(null);

export function useStableDispatch() {
  const context = React.useContext(StableDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useStableDispatch must be used within a StableDispatchProvider"
    );
  }

  return context;
}

const StableDispatchProvider = ({ children }) => {
  const dispatch = useDispatch();

  const stableDispatch = useCallback(dispatch, []);

  return (
      <StableDispatchContext.Provider value={stableDispatch}>
        {children}
      </StableDispatchContext.Provider>
  );
};

export default StableDispatchProvider;
