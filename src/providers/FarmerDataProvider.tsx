import { createContext, ReactNode, useState } from "react";

export interface FarmerDataProviderInterface {
  children: ReactNode;
}

interface FarmerDataInterface {
  id: number;
}

interface FarmerDataContextInterface {
  data: FarmerDataInterface;
  setData: (id: number) => void;
}

const startingState: FarmerDataContextInterface = {
  data: { id: -1 },
  setData: () => {},
};

const FarmerContext = createContext(startingState);

const FarmerDataProvider = ({ children }: FarmerDataProviderInterface) => {
  const [farmerData, setFarmerData] = useState<FarmerDataInterface>(
    startingState.data
  );

  const handleSetData = (id: number) => {
    setFarmerData({ id: id });
  };

  const state: FarmerDataContextInterface = {
    data: farmerData,
    setData: handleSetData,
  };

  return (
    <FarmerContext.Provider value={state}>{children}</FarmerContext.Provider>
  );
};

export { FarmerDataProvider, FarmerContext };
