const CAT_API_URL = "https://api.thecatapi.com/v1/breeds";
const LIMIT = 10;

const getBreedList = async (page) => {
  const respon = await fetch(`${CAT_API_URL}?page=${page}&limit=${LIMIT}`);
  const data = await respon.json();

  return data;
};

export { getBreedList };
