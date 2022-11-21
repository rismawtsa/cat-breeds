import { useState, useEffect, useRef, useCallback } from "react";
import { getBreedList, searchBreeds } from "./services/catApi";
import Error from "./components/error";
import Search from "./components/search";
import "./App.css";

function App() {
  const [catBreedList, setCatBreedList] = useState([]);
  const [catBreeds, setCatBreeds] = useState(null);
  const [page, setPage] = useState(0);
  const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetail, setShowDetail] = useState({});

  let observer = useRef();
  const lastCatElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !noData) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, noData]
  );

  const fetchBreadList = async () => {
    try {
      setIsLoading(true);
      const list = await getBreedList(page);
      setCatBreedList((prev) => prev.concat(list));
      if (list.length === 0) setNoData(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBreadList();
  }, [page]);

  const handleSearchBreeds = async (name) => {
    const list = await searchBreeds(name);
    setCatBreeds(list);
    console.log("handleSearchBreeds", list);
  };

  const handleClearSearch = () => {
    console.log("handleClearSearch");
    setCatBreeds(null);
  };

  const handleItemClick = (id) => {
    let flag = showDetail[id] ? false : true;
    setShowDetail((prev) => ({ ...prev, [id]: flag }));
  };

  const generateBreedList = () => {
    if (catBreedList.length === 0) return <div>No Data</div>;

    let list = catBreedList;
    if (catBreeds) list = catBreeds;

    return (
      <ul className="list">
        {list.map((cat, index) => {
          if (index + 1 === list.length) {
            return (
              <li
                key={cat.id}
                onClick={() => handleItemClick(cat.id)}
                ref={lastCatElementRef}
              >
                <div>{cat.name}</div>
                {showDetail[cat.id] && (
                  <div>
                    {cat.id}|{cat.name} more detail will be here
                  </div>
                )}
              </li>
            );
          } else {
            return (
              <li key={cat.id} onClick={() => handleItemClick(cat.id)}>
                <div>{cat.name}</div>
                {showDetail[cat.id] && (
                  <div>
                    {cat.id}|{cat.name} more detail will be here
                  </div>
                )}
              </li>
            );
          }
        })}
      </ul>
    );
  };

  return (
    <>
      <Error message={error} />
      <header className="App-header">
        <h3>List of Cat breeds</h3>
      </header>
      <main>
        <Search onSearch={handleSearchBreeds} onClear={handleClearSearch} />
        {generateBreedList()}
        {isLoading && <div>loading...</div>}
        {noData && <div>No more data</div>}
      </main>
    </>
  );
}

export default App;
