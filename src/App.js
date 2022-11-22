import { useState, useRef, useCallback } from "react";
import useCatFetch from "./hooks/useCatFetch";
import Error from "./components/error";
import Search from "./components/search";
import Header from "./components/header";
import Skeleton from "./components/skeleton";
import NoData from "./components/noData";
import Arrow from "./components/arrow";
import noImage from "./assets/no-image-icon-15.png";
import "./App.css";

function App() {
  const [catSearchResult, setCatSearchResult] = useState(null);
  const [page, setPage] = useState(0);
  const [showDetail, setShowDetail] = useState({});
  const [isSearch, setIsSearch] = useState(false);

  const { isLoading, catList, error, hasMore } = useCatFetch(page);

  let observer = useRef();
  const lastCatElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isSearch) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, isSearch]
  );

  const handleSearchCat = async (query) => {
    const list = catList.filter(
      ({ name, origin }) =>
        name.toLowerCase().includes(query.toLowerCase()) ||
        origin.toLowerCase().includes(query.toLowerCase())
    );

    setCatSearchResult(list);
    setIsSearch(true);
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    setCatSearchResult(null);
  };

  const handleItemClick = (id) => {
    let flag = showDetail[id] ? false : true;
    setShowDetail((prev) => ({ ...prev, [id]: flag }));
  };

  const generateCatDetail = (cat) => {
    if (!showDetail[cat.id]) return;

    return (
      <div className="item-detail">
        <strong>Id: {cat.id}</strong>
        <p>{cat.description}</p>
        <div>
          <i>{cat.temperament}</i>
          <br />
          <br />
          {cat.weight && cat.weight.metric} kgs
          <br />
          {cat.life_span} avarage life span
          <br />
        </div>
        <a href={cat.wikipedia_url} target="_blank" rel="noopener noreferrer">
          Wikipedia
        </a>
      </div>
    );
  };

  const generateCatList = () => {
    let list = catList;
    if (catSearchResult) list = catSearchResult;

    if (!isLoading && !error && list.length === 0) return <NoData />;

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
                    <span>{cat.origin}</span>
                  </div>
                </div>
                <Arrow type={showDetail[cat.id] ? "collapse" : "expand"} />
              </div>
              {generateCatDetail(cat)}
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
        <Search onSearch={handleSearchCat} onClear={handleClearSearch} />
        {generateCatList()}
        <Skeleton isLoading={isLoading} count={page === 0 ? 4 : 1} />
        <NoData
          isShow={!hasMore && !isSearch && !error}
          message="--- No More Data ---"
        />
        <Error message={error} />
      </main>
    </>
  );
}

export default App;
