import englishTitle from "../enTitle";

function FoodListItem({ item, enTitle }) {
  const dateFormat = () => {
    const timeStamp = new Date(item.updatedAt);
    // const formatDate = timeStamp.toISOString().substring(0, 10);
    const formatDate = timeStamp.toUTCString().substring(0, 11);
    return formatDate;
  };

  return (
    <>
      <div
        className="flex items-center h-[160px] sm:h-[150px] gap-5 border-2 border-grey rounded-xl p-4 my-2"
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
            src={item.imgUrl}
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
      </div>
    </>
  );
}

function FoodList({ items }) {
  const itemsList = items.map((item) => {
    const enTitleFind = englishTitle.find((enItem) => item.id === enItem.id);
    const enTitle = enTitleFind?.title;
    return (
      <li key={item.id}>
        <FoodListItem item={item} enTitle={enTitle} />
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
