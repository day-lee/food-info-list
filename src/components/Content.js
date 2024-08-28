import { useState, useEffect } from "react";

import FoodList from "./FoodList";
import { getLists, deleteList } from "../api";
import FoodForm from "./FoodForm";

import searchImg from "../assets/search.svg";

function Content() {
  const [cursor, setCursor] = useState("");
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [search, setSearch] = useState("");
  const [isCalorieSelected, setIsCalorieSelected] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(true);

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
      setIsCalorieSelected(true);
      setIsDateSelected(false);
    } else if (id === "byDate") {
      setOrder("createdAt");
      setIsCalorieSelected(false);
      setIsDateSelected(true);
    }
  };

  const handleSubmitSuccess = (item) => {
    setItems((prevItems) => [item, ...prevItems]);
  };

  const handleDelete = async (postId) => {
    const result = await deleteList(postId);
    if (!result) return;
    // notice filter from prevItem
    setItems((prevItems) => prevItems.filter((item) => item.id !== postId));
  };

  useEffect(() => {
    //console.log(order, cursor);
    handleLoad({ order, search });
  }, [order, search]);

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:px-20 mb-4">
        <div className="flex flex-col items-center pt-8 pb-4 w-5/6">
          <FoodForm onSubmitSuccess={handleSubmitSuccess} />
          <div className="flex w-full mt-10 justify-start gap-5">
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
              <button
                className={` ${
                  isCalorieSelected && "text-darkgreen font-semibold"
                }`}
                id="byCalorie"
                onClick={handleChangeOrder}
              >
                By calorie
              </button>

              <button
                className={`${
                  isDateSelected && "font-semibold text-darkgreen"
                }`}
                id="byDate"
                onClick={handleChangeOrder}
              >
                By date
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center sm:justify-start w-5/6">
          <FoodList items={items} onDelete={handleDelete} />
          <div className="flex justify-center">
            {loadingError?.message && <div> {loadingError.message}</div>}
            {cursor && (
              <button
                className={`my-10 w-[150px] bg-green rounded text-white font-semibold py-1 hover:bg-darkgreen ${
                  isLoading && "bg-gray-300 hidden"
                }`}
                onClick={handleLoadMore}
              >
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Content;
