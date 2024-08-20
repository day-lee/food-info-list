import { useState, useEffect } from "react";

import FoodList from "./FoodList";
import getLists from "../api";

function Content() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("calorie");

  const handleLoad = async (query) => {
    const { foods } = await getLists(query);
    setItems(foods);
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
    handleLoad(order);
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
    </>
  );
}
export default Content;
