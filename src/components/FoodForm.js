import { useState } from "react";
import FileInput from "./FileInput";

const DEFAULT_VALUES = {
  title: "",
  content: "",
  calorie: 0,
  imgUrl: "",
};

function FoodForm() {
  const [values, setValues] = useState(DEFAULT_VALUES);

  const { title, content, calorie, imgUrl } = values;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = (name, value) => {
    console.log(name, value);
    setValues((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    console.log("submit");
  };

  return (
    <div className="h-[138px] w-auto rounded-xl p-2 mb-14 border-2">
      <form
        className="flex items-center gap-4 justify-center p-3"
        onSubmit={handleSubmit}
      >
        <div className="w-[100px] h-[87px] relative border-2 rounded-md">
          <FileInput name="imgUrl" value={imgUrl} onChange={handleChange} />
        </div>
        <div className="flex flex-col w-90%">
          <div className="flex justify-between pt-1 pb-4">
            <div className="pr-4">
              <label htmlFor="title"></label>
              <input
                className="p-1 border-2 rounded-md"
                id="title"
                name="title"
                placeholder="e.g. apple"
                type="text"
                value={title}
                onChange={handleInputChange}
              />
            </div>
            <div className="pr-4">
              <label htmlFor="calorie"></label>
              <input
                className="p-1 border-2 rounded-md"
                id="calorie"
                name="calorie"
                type="number"
                value={calorie}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button
                className="bg-green rounded-md text-white font-semibold border px-2 py-1 hover:bg-darkgreen"
                type="submit"
              >
                Post
              </button>
            </div>
          </div>
          <div className="">
            <label htmlFor="content"></label>
            <input
              className="p-1.5 border-2 rounded-md"
              id="content"
              name="content"
              type="text"
              placeholder="e.g. large (250g)"
              value={content}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default FoodForm;
