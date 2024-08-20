function FoodListItem({ item }) {
  const dateFormat = () => {
    const timeStamp = new Date(item.updatedAt);
    const formatDate = timeStamp.toISOString().substring(0, 10);
    return formatDate;
  };
  return (
    <>
      <div className="p-3" key={item.id}>
        <div>
          <img className="h-20" src={item.imgUrl} alt={item.title} />
        </div>
        <div>Name: {item.title}</div>
        <div>Calorie: {item.calorie}</div>
        <div>Unit: {item.content}</div>
        <div>Created date: {dateFormat(item.createdAt)}</div>
      </div>
    </>
  );
}

function FoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <FoodListItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
