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
    <div className="h-[250px] p-3 border-2">
      <form onSubmit={handleSubmit}>
        <FileInput name="imgUrl" value={imgUrl} onChange={handleChange} />
        <label htmlFor="title">title</label>
        <input
          className="p-1 border-2"
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleInputChange}
        />
        <label htmlFor="content">content</label>
        <input
          className="p-1 border-2"
          id="content"
          name="content"
          type="text"
          value={content}
          onChange={handleInputChange}
        />
        <label htmlFor="calorie">calorie</label>
        <input
          className="p-1 border-2"
          id="calorie"
          name="calorie"
          type="number"
          value={calorie}
          onChange={handleInputChange}
        />
        <div>
          <button
            className="bg-green rounded text-white font-semibold border px-2 py-1"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default FoodForm;
