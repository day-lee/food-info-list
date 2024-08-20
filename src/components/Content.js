import { useState, useEffect } from "react";

import FoodList from "./FoodList";
import getLists from "../api";
import FoodForm from "./FoodForm";

const LIMIT = 10;

function Content() {
  const [cursor, setCursor] = useState("");
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("calorie");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [search, setSearch] = useState("");

  const handleLoad = async (queries) => {
    //TODO: try catch isloading button color change
    let result;
    try {
      setLoadingError(null);
      setIsLoading(true);
      result = await getLists(queries);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const {
      foods,
      paging: { nextCursor },
    } = result;

    if (!queries.cursor) {
      setItems(foods);
    } else {
      // foods is an array, which is reference types
      // Use spread syntax to avoid modifying existing array issue
      setItems((prevItem) => [...prevItem, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Access an element by name within the form
    setSearch(e.target["search"].value);
  };

  const handleLoadMore = () => {
    console.log(order, cursor);
    handleLoad({ order, cursor, search });
  };

  const handleChangeOrder = (e) => {
    const { id } = e.target;
    if (id === "byCalorie") {
      setOrder("calorie");
    } else if (id === "byDate") {
      setOrder("createdAt");
    }
  };

  useEffect(() => {
    //console.log(order, cursor);
    handleLoad({ order, search });
  }, [order, search]);

  return (
    <>
      <FoodForm />
      <div className="p-3">
        <div>
          <button id="byCalorie" onClick={handleChangeOrder}>
            By calorie
          </button>
        </div>
        <div>
          <button id="byDate" onClick={handleChangeOrder}>
            By date
          </button>
        </div>
        <div>
          <form onSubmit={handleSearchSubmit}>
            <input type="text" name="search" className="border" />
            <button type="submit"> Search </button>
          </form>
        </div>
      </div>

      <div className="p-10">
        <FoodList items={items} />
      </div>
      {loadingError?.message && <div> {loadingError.message}</div>}
      <div className="p-3">
        {cursor && (
          <button
            className={`bg-green rounded text-white font-semibold px-3 py-1 ${
              isLoading && "bg-gray-300 hidden"
            }`}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
}
export default Content;
