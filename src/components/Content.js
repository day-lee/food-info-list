import { useContext, useEffect, useState } from "react";

import { createList, deleteList, getLists, updateList } from "../api";
import ThemeContext from "../contexts/ThemeContext";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";

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

  const themeDark = useContext(ThemeContext);

  const handleLoad = async (queries) => {
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
      setItems((prevItem) => [...prevItem, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
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

  const handleCreateSuccess = (item) => {
    setItems((prevItems) => [item, ...prevItems]);
  };

  const handleUpdateSuccess = (food) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === food.id);
      return [
        ...prevItems.slice(0, splitIdx),
        food,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  const handleDelete = async (postId) => {
    const result = await deleteList(postId);
    if (!result) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== postId));
  };

  useEffect(() => {
    handleLoad({ order, search });
  }, [order, search]);

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center min-w-24 sm:px-20 ${
          themeDark && "bg-gray-800"
        }`}
      >
        <div className="flex flex-col items-center pt-8 pb-4 w-5/6">
          <FoodForm
            onSubmit={createList}
            onSubmitSuccess={handleCreateSuccess}
          />
          <div className="flex w-full mt-10 justify-start gap-5">
            <form className="relative" onSubmit={handleSearchSubmit}>
              <input
                className={`p-1 border-2 border-green rounded-md h-8 ${
                  themeDark && "bg-gray-800 text-white"
                }`}
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
            <div className={`flex gap-5  ${themeDark && "text-white"}`}>
              <button
                className={`hover:bg-lime-700 rounded-xl px-1 ${
                  isCalorieSelected && "text-darkgreen font-semibold"
                }`}
                id="byCalorie"
                onClick={handleChangeOrder}
              >
                By calorie
              </button>

              <button
                className={`hover:bg-lime-800 rounded-xl px-1 ${
                  isDateSelected && "font-semibold text-darkgreen "
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
          <FoodList
            items={items}
            onDelete={handleDelete}
            onUpdate={updateList}
            onUpdateSuccess={handleUpdateSuccess}
          />
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
