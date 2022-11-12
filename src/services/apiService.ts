import { ExecOptionsWithStringEncoding } from "child_process";
import { useContext } from "react";
import { FarmerContext } from "../providers/FarmerDataProvider";

//const { data, setData } = useContext(FarmerContext);

export const getHomeDetailsById = async () => {
  const rawData = await fetch(
    "http://localhost:5228/api/Farms/GetHomeDetails?farmerID=1"
  );
  const data = await rawData.json();
  return data;
};

export const postNewFarm = async (name: string) => {
  try {
    await fetch("http://localhost:5228/api/Farms/AddFarm/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        farmColor: "not implemented",
      }),
    });
    // TODO: add to list
  } catch (err) {
    console.error(err);
  }
};

export const getFarmsByFarmerId = async () => {
  const rawData = await fetch("http://localhost:5228/api/Farms/1");
  const data = await rawData.json();
  return data;
};

export const getFarmers = async () => {
  const rawData = await fetch("http://localhost:5228/api/Farmers");
  const data = await rawData.json();
  return data;
};

export const getDeliveries = async () => {
  const rawData = await fetch("http://localhost:5228/api/Delivery");
  const data = await rawData.json();
  return data;
};

export const deleteFarmByFarmId = async (farmId: string) => {
  await fetch(`http://localhost:5228/api/Farms/DeleteFarm/${farmId}`, {
    method: "DELETE",
  });
};

export const postNewOrderHachery = async (
  farmId: string,
  hatcheryID: string,
  dateOfArrival: string,
  numberMale: string,
  numberFemale: string
) => {
  await fetch(`http://localhost:5228/api/OrderHatchery/${farmId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hatcheryID,
      dateOfArrival,
      numberMale,
      numberFemale,
    }),
  });
};

export const getHatcheryOrderdsByFarmId = async (farmId: string) => {
  const rawData = await fetch(
    `http://localhost:5228/api/OrderHatchery/GetDeliveriesDates/${farmId}`
  );
  const data = await rawData.json();
  return data;
};

export const postNewCycle = async (
  farmId: string,
  description: string,
  dateOut: string,
  hatcheryOrderID: string
) => {
  await fetch(`http://localhost:5228/api/Cycle/CreateCycle/${farmId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description,
      dateOut,
      hatcheryOrderID,
    }),
  });
};

export const postNewDelivery = async (deliveryDate: string, weight: string) => {
  await fetch(`http://localhost:5228/api/Delivery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deliveryDate,
      weight,
    }),
  });
};

export const postDeathsByFarmId = async (
  farmId: string,
  deathsMale: string,
  deathsFemale: string
) => {
  await fetch(`http://localhost:5228/api/Farms/AddDeaths/${farmId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deathsMale,
      deathsFemale,
    }),
  });
};

export const getCycleByFarmerId = async () => {
  const rawData = await fetch(`http://localhost:5228/api/Cycle/1`);
  const data = await rawData.json();
  return data;
};

export const postNewExport = async (
  cycleId: string,
  date: string,
  numberMale: string,
  numberFemale: string,
  weight: string
) => {
  await fetch(`http://localhost:5228/api/Export/AddExport/${cycleId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date,
      numberMale,
      numberFemale,
      weight,
    }),
  });
};

export const getFarmScheduleEventsByFarmId = async (farmId: string) => {
  const rawData = await fetch(
    `http://localhost:5228/api/Farms/GetAllFarmEvents/${farmId}`
  );
  const data = await rawData.json();
  return data;
};

export const getFarmerScheduleEventsByFarmerId = async (farmerId: string) => {
  const rawData = await fetch(
    `http://localhost:5228/api/Farmers/GetFarmerEvents/${farmerId}`
  );
  const data = await rawData.json();
  return data;
};

export const getFeedDetailsByFarmerId = async () => {
  const rawData = await fetch(
    `http://localhost:5228/api/OrderFeed/GetOrdersSchedule/1`
  );
  const data = await rawData.json();
  return data;
};

export const postNewOrderFeed = async (
  farmId: string,
  feedHouseID: string,
  dateOfArrival: string,
  weight: string
) => {
  try {
    await fetch(`http://localhost:5228/api/OrderFeed/${farmId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedHouseID,
        dateOfArrival,
        weight,
      }),
    });
    // TODO: add to list
  } catch (err) {
    console.error(err);
  }
};

export const getFeedEventsByFarmerId = async () => {
  const rawData = await fetch(
    `http://localhost:5228/api/OrderFeed/GetEvents/1`
  );
  const data = await rawData.json();
  return data;
};

export const getDeliveryEvents = async () => {
  const rawData = await fetch(`http://localhost:5228/api/Delivery/GetEvents`);
  const data = await rawData.json();
  return data;
};

export const getUserId = async (
  login: string,
  password: string
): Promise<void> => {
  /*
    call do api, wiadomosc zwrotna
  
    setData(id z BE)
    */
};
