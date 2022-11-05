export const getHomeDetailsById = async () => {
  const rawData = await fetch("http://localhost:5228/api/Farms/GetHomeDetails?farmerID=1");
  const data = await rawData.json();
  return data;
};
export const postNewFarm = async (
  name: string
) => {
  try {
    await fetch("http://localhost:5228/api/Farms/AddFarm/1", {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name,
        farmColor :'not implemented'})
      })
      // TODO: add to list
  } catch(err) {
    console.error(err)
  }

};

export const getFarmsByFarmerId = async () => {
  const rawData = await fetch("http://localhost:5228/api/Farms/1");
  const data = await rawData.json();
  return data;
};

export const deleteFarmByFarmId = async (
  farmId: string
) => {
await fetch(`http://localhost:5228/api/Farms/DeleteFarm/${farmId}`, {
method: "DELETE"}
)};

export const postNewOrderHachery = async (
  farmId: string,
  hatcheryID: string,
  dateOfArrival: string,
  numberMale: string,
  numberFemale: string
) => {
await fetch(`http://localhost:5228/api/OrderHatchery/${farmId}`, {
method: "POST",
headers: {'Content-Type':'application/json'},
body: JSON.stringify({
  hatcheryID,
  dateOfArrival,
  numberMale,
  numberFemale})
})
};

export const getHatcheryOrderdsByFarmId = async (
  farmId: string
) => {
  const rawData = await fetch(`http://localhost:5228/api/OrderHatchery/GetDeliveriesDates/${farmId}`);
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
headers: {'Content-Type':'application/json'},
body: JSON.stringify({
  description,
  dateOut,
  hatcheryOrderID})
})
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
headers: {'Content-Type':'application/json'},
body: JSON.stringify({
  date,
  numberMale,
  numberFemale,
  weight})
})
};
