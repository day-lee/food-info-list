import englishTitle from "../enTitle";
import noImg from "../assets/no-image.svg";

function FoodListItem({ item, enTitle, onDelete }) {
  const dateFormat = () => {
    const timeStamp = new Date(item.updatedAt);
    // const formatDate = timeStamp.toISOString().substring(0, 10);
    const formatDate = timeStamp.toUTCString().substring(0, 11);
    return formatDate;
  };

  return (
    <>
      <div
        className="flex relative items-center h-[160px] sm:h-[150px] gap-5 border-2 border-grey rounded-xl p-4 my-2"
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
        <div className="flex flex-col gap-2  ">
          <div className="">
            <span className="font-semibold text-lg truncate">{item.title}</span>

            <p className="font-semibold text-lg">{enTitle}</p>
          </div>
          <div className="text-gray-500">{item.content}</div>
          <div className="text-gray-400 "> {dateFormat(item.createdAt)}</div>
        </div>
        <div className="flex gap-2 absolute bottom-5 right-4">
          <button className="w-full rounded-md text-white font-semibold border px-2 py-1 bg-green hover:bg-darkgreen">
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
    </>
  );
}

function FoodList({ items, onDelete }) {
  const itemsList = items.map((item) => {
    const enTitleFind = englishTitle.find((enItem) => item.id === enItem.id);
    const enTitle = enTitleFind?.title;
    return (
      <li key={item.id}>
        <FoodListItem item={item} enTitle={enTitle} onDelete={onDelete} />
      </li>
    );
  });

  return (
    <ul className="flex flex-col justify-center sm:justify-start gap-2">
      {itemsList}
    </ul>
  );
}

export default FoodList;

/**
 * 1. editingId state for remembering current edit post,
 * conditionally render  FoodForm or FoodList
 * 2. Edit btn on FoodListItem
 *
 * 3. Fill the value on edit: initialValues
 * 4. Cancel btn
 * 5. imgUrl on FileInput, useEffect
 * 6. API test
 * 7. FoodForm 새로 작성 or 업데이트 ?
 * 8. handleUpdateSuccess() items state 업데이트
 */
