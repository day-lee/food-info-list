import { useContext, useState } from "react";

import FoodForm from "./FoodForm";

import noImg from "../assets/no-image.svg";
import ThemeContext from "../contexts/ThemeContext";
import englishTitle from "../enTitle";

function FoodListItem({ item, enTitle, onDelete, onEdit }) {
  const themeDark = useContext(ThemeContext);
  const dateFormat = () => {
    const timeStamp = new Date(item.updatedAt);
    const formatDate = timeStamp.toUTCString().substring(0, 11);
    return formatDate;
  };

  return (
    <div
      className="flex relative h-[220px] sm:h-[150px] gap-5 border-2 truncate overflow-hidden  border-grey rounded-xl p-4 my-2"
      key={item.id}
    >
      <div className="relative shrink-0">
        <div className="absolute bottom-2">
          <span className="bg-grey p-1 m-2 rounded shadow text-lime-900 bg-opacity-80 font-extrabold text-sm">
            {item.calorie} kcal
          </span>
        </div>
        <img
          className="rounded w-[130px] h-[100px] sm:w-[150px]"
          src={item.imgUrl || noImg}
          alt={item.title}
        />
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        <div className="w-full">
          <span
            className={`font-semibold text-lg inline-block truncate w-full ${
              themeDark && "text-white"
            }`}
          >
            {item.title}
          </span>
          <p
            className={`font-semibold text-lg truncate w-full ${
              themeDark && "text-white"
            }`}
          >
            {enTitle}
          </p>
        </div>
        <div className="text-gray-500">{item.content}</div>
        <div className="text-gray-500 "> {dateFormat(item.createdAt)}</div>
      </div>
      <div className="flex gap-2 absolute bottom-3 right-4">
        <button
          className="w-full rounded-md text-white font-semibold border px-2 py-1 bg-green hover:bg-darkgreen"
          onClick={() => onEdit(item.id)}
        >
          Edit
        </button>
        <button
          className="w-full rounded-md text-white font-semibold border px-2 py-1 bg-gray-400 hover:bg-gray-500"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [foodId, setFoodId] = useState(null);

  const itemsList = items.map((item) => {
    const enTitleFind = englishTitle.find((enItem) => item.id === enItem.id);
    const enTitle = enTitleFind?.title;
    const { id, imgUrl, title, content, calorie } = item;
    const initialValues = { title, content, calorie };

    const handleCancel = () => {
      setFoodId(null);
    };

    if (id === foodId) {
      const handleSubmit = (formData) => onUpdate(id, formData);

      const handleSubmitSuccess = (food) => {
        onUpdateSuccess(food);
        setFoodId(null);
      };
      return (
        <li key={item.id}>
          <FoodForm
            initialValues={initialValues}
            initialPreview={imgUrl}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            onSubmitSuccess={handleSubmitSuccess}
          />
        </li>
      );
    } else {
      return (
        <li key={item.id}>
          <FoodListItem
            item={item}
            enTitle={enTitle}
            onDelete={onDelete}
            onEdit={setFoodId}
          />
        </li>
      );
    }
  });

  return (
    <ul className="flex flex-col justify-center sm:justify-start gap-2">
      {itemsList}
    </ul>
  );
}

export default FoodList;
