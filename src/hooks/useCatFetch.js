import { useState, useEffect } from "react";
import { getBreedList } from "../services/catService";

const LIMIT = 10;

export default function useCatFetch(page) {
  const [isLoading, setIsLoading] = useState(true);
  const [catList, setCatList] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    const fetchCat = async () => {
      try {
        const list = await getBreedList(page);
        setCatList((prev) => prev.concat(list));
        setHasMore(list.length >= LIMIT);
      } catch (error) {
        setError("Oops, there is something wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCat();
  }, [page]);

  return { isLoading, catList, error, hasMore };
}
