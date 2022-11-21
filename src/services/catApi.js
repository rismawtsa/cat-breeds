const CAT_API_URL = "https://api.thecatapi.com/v1/breeds";
const LIMIT = 10;

const getBreedList = async (page) => {
  const respon = await fetch(`${CAT_API_URL}?page=${page}&limit=${LIMIT}`);
  const data = await respon.json();

  return data;
};

const searchBreeds = async (name) => {
  const respon = await fetch(`${CAT_API_URL}/search?q=${name}`);
  const data = await respon.json();

  return data;
};

export { getBreedList, searchBreeds };
