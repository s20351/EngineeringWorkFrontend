export const getHomeDetailsById = async (
  id: number | string
): Promise<string> => {
  const rawData = await fetch("https://rickandmortyapi.com/api/character");
  const data = await rawData.json();
  return data;
};

export const postNewFarm = () => {};
