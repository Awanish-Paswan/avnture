import { createContext, useContext } from "react";
import type { BlogPost, Project } from "../types";

export type InitialData = {
  projects?: Project[];
  project?: Project;
  posts?: BlogPost[];
  post?: BlogPost;
};

declare global {
  interface Window {
    __INITIAL_DATA__?: InitialData;
  }
}

const InitialDataContext = createContext<InitialData>({});

export function InitialDataProvider({
  data,
  children,
}: {
  data: InitialData;
  children: React.ReactNode;
}) {
  return (
    <InitialDataContext.Provider value={data}>
      {children}
    </InitialDataContext.Provider>
  );
}

export function useInitialData() {
  return useContext(InitialDataContext);
}
