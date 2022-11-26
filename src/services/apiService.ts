const baseUri: string = "https://indoswstawienia.azurewebsites.net/api/";

export const Register = async (
  Email: string,
  Password: string,
  Name: string,
  Surname: string
) => {
  try {
    const response = await fetch(`${baseUri}Auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name,
        Surname,
        Email,
        Password
      })
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const Login = async (
  Email: string,
  Password: string
) => {
  try {
    const response = await fetch(`${baseUri}Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email,
        Password
      })
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getHomeDetailsById = async (
  id: number
) => {
  const rawData = await fetch(
    `${baseUri}Farms/GetHomeDetails?farmerID=${id}`
  );
  const data = await rawData.json();
  return data;
};

export const postNewFarm = async (
  id: number,
  name: string) => {
  try {
    const response = await fetch(`${baseUri}Farms/AddFarm/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        farmColor: "not implemented",
      })
    });
    return response.status;
  } catch (err) {
    console.error(err);
  }
};

export const getFarmsByFarmerId = async (
  id: number
) => {
  const rawData = await fetch(`${baseUri}Farms/${id}`);
  const data = await rawData.json();
  return data;
};

export const getFarmers = async () => {
  const rawData = await fetch(`${baseUri}Farmers`);
  const data = await rawData.json();
  return data;
};

export const getDeliveries = async () => {
  const rawData = await fetch(`${baseUri}Delivery`);
  const data = await rawData.json();
  return data;
};

export const deleteFarmByFarmId = async (farmId: string) => {
  await fetch(`${baseUri}Farms/DeleteFarm/${farmId}`, {
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
  await fetch(`${baseUri}OrderHatchery/${farmId}`, {
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
    `${baseUri}OrderHatchery/GetDeliveriesDates/${farmId}`
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
  await fetch(`${baseUri}Cycle/CreateCycle/${farmId}`, {
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
  await fetch(`${baseUri}Delivery`, {
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
  await fetch(`${baseUri}Farms/AddDeaths/${farmId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deathsMale,
      deathsFemale,
    }),
  });
};

export const getCycleByFarmerId = async (
  id: number
) => {
  const rawData = await fetch(`${baseUri}Cycle/${id}`);
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
  await fetch(`${baseUri}Export/AddExport/${cycleId}`, {
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
    `${baseUri}Farms/GetAllFarmEvents/${farmId}`
  );
  const data = await rawData.json();
  return data;
};

export const getFarmerScheduleEventsByFarmerId = async (farmerId: string) => {
  const rawData = await fetch(
    `${baseUri}Farmers/GetFarmerEvents/${farmerId}`
  );
  const data = await rawData.json();
  return data;
};

export const getFeedDetailsByFarmerId = async (
  farmerId: number
) => {
  const rawData = await fetch(
    `${baseUri}OrderFeed/GetOrdersSchedule/${farmerId}`
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
    await fetch(`${baseUri}OrderFeed/${farmId}`, {
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

export const getFeedEventsByFarmerId = async (farmerId: number) => {
  const rawData = await fetch(
    `${baseUri}OrderFeed/GetEvents/${farmerId}`
  );
  const data = await rawData.json();
  return data;
};

export const getDeliveryEvents = async () => {
  const rawData = await fetch(`${baseUri}Delivery/GetEvents`);
  const data = await rawData.json();
  return data;
};