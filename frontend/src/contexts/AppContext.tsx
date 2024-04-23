import { TAppContext } from "@/lib/types";
import { validateToken } from "../api-client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const AppContext = createContext<TAppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as TAppContext;
};
