'use client';
import { UserSessionData } from "@/types";
import React from "react";

interface RootProviderProps {
  user: UserSessionData["user"];
  children?: React.ReactNode;
}
interface RootStateContextProps {
  user?: UserSessionData["user"];
}
export const RootStateContext = React.createContext<RootStateContextProps>({});

export const useRootState = () => React.useContext(RootStateContext);

function RootProvider({ user, children }: RootProviderProps) {
  return (
    <RootStateContext.Provider value={{ user }}>{children}</RootStateContext.Provider>
  );
}

export default RootProvider;
