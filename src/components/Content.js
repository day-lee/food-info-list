import { useState, useEffect } from "react";

import FoodList from "./FoodList";
import getLists from "../api";
import FoodForm from "./FoodForm";

import searchImg from "../assets/search.svg";

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
      <div className="flex flex-col items-center px-[250px] pt-10 pb-4">
        <FoodForm />

        <div className="flex w-full justify-between">
          <form className="relative" onSubmit={handleSearchSubmit}>
            <input
              className="p-1 border-2 border-green rounded-md h-8"
              type="text"
              name="search"
            />
            <button type="submit">
              <img
                className="w-5 absolute top-2 right-2"
                src={searchImg}
                alt="search"
              />
            </button>
          </form>
          <div className="flex gap-5">
            <button className="" id="byCalorie" onClick={handleChangeOrder}>
              By calorie
            </button>

            <button className="" id="byDate" onClick={handleChangeOrder}>
              By date
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center px-[250px]">
        <div className="">
          <FoodList items={items} />
        </div>
        {loadingError?.message && <div> {loadingError.message}</div>}
        <div className="px-20 py-10">
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
      </div>
    </>
  );
}
export default Content;
