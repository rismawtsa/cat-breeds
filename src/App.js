import { useState, useEffect, useRef, useCallback } from "react";
import { getBreedList, searchBreeds } from "./services/catApi";
import Error from "./components/error";
import Search from "./components/search";
import Header from "./components/header";
import Skeleton from "./components/skeleton";
import NoData from "./components/noData";
import Arrow from "./components/arrow";
import noImage from "./assets/no-image-icon-15.png";

import "./App.css";

const LIMIT = 10;

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
      if (list.length < LIMIT) setNoData(true);
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
  };

  const handleClearSearch = () => {
    setCatBreeds(null);
  };

  const handleItemClick = (id) => {
    let flag = showDetail[id] ? false : true;
    setShowDetail((prev) => ({ ...prev, [id]: flag }));
  };

  const generateBreedList = () => {
    let list = catBreedList;
    if (catBreeds) list = catBreeds;

    if (!isLoading && list.length === 0) return <NoData />;

    return (
      <ul className="list">
        {list.map((cat, index) => {
          let ref = null;
          if (index + 1 === list.length) ref = lastCatElementRef;
          return (
            <li key={index} ref={ref}>
              <div className="item" onClick={() => handleItemClick(cat.id)}>
                <div className="item-image">
                  <img
                    src={cat.image ? cat.image.url : noImage}
                    alt={cat.image && cat.image.id}
                  />
                </div>
                <div>
                  <div className="item-name">{cat.name}</div>
                  <div className="item-other-info">
                    <i>{cat.temperament}</i>
                  </div>
                </div>
                <Arrow type={showDetail[cat.id] ? "collapse" : "expand"} />
              </div>
              {showDetail[cat.id] && (
                <div className="item-detail">
                  <strong>Id: {cat.id}</strong>
                  <p>{cat.description}</p>
                  <div>
                    {cat.origin}
                    <br />
                    <br />
                    {cat.weight && cat.weight.metric} kgs
                    <br />
                    {cat.life_span} avarage life span
                    <br />
                  </div>
                  <a
                    href={cat.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikipedia
                  </a>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <Header />
      <main>
        <Search onSearch={handleSearchBreeds} onClear={handleClearSearch} />
        {generateBreedList()}
        <Skeleton isLoading={isLoading} count={page === 0 ? 4 : 1} />
        {<NoData isShow={noData} message="--- No More Data ---" />}
        <Error message={error} />
      </main>
    </>
  );
}

export default App;
