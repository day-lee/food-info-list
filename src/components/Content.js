import { useState, useEffect } from "react";

import FoodList from "./FoodList";
import getLists from "../api";

const LIMIT = 10;

function Content() {
  const [cursor, setCursor] = useState("");
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("calorie");

  const handleLoad = async (queries) => {
    console.log(queries);
    const {
      foods,
      paging: { nextCursor },
    } = await getLists(queries);
    if (!queries.cursor) {
      setItems(foods);
    } else {
      // foods is an array, which is reference types
      // Use spread syntax to avoid modifying existing array issue
      setItems((prevItem) => [...prevItem, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = () => {
    console.log(order, cursor);
    handleLoad({ order, cursor });
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
    handleLoad({ order, cursor, LIMIT });
  }, [order]);

  return (
    <>
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
      </div>

      <div className="p-10">
        <FoodList items={items} />
      </div>
      <div className="p-3">
        <button onClick={handleLoadMore}> Load more</button>
      </div>
    </>
  );
}
export default Content;
