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
        className="flex items-center h-[150px] w-[400px] gap-5 border-2 border-grey rounded-xl p-4 my-2 w-[506px]"
        key={item.id}
      >
        <div className>
          <img
            className="rounded w-[150px] h-[100px]"
            src={item.imgUrl}
            alt={item.title}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="">
            <span className="font-semibold text-lg">{item.title}</span>
            <span className="bg-grey p-1 m-2 rounded text-darkgreen font-extrabold text-sm">
              {item.calorie} kcal
            </span>
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

  return <ul className="flex flex-wrap justify-start gap-3">{itemsList}</ul>;
}

export default FoodList;
