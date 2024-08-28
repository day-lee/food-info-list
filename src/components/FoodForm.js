import { useState } from "react";
import FileInput from "./FileInput";
import { createList } from "../api";

const DEFAULT_VALUES = {
  title: "",
  content: "",
  calorie: 0,
  imgUrl: null,
};
/** FoodForm is shown 1. initial post 2. updating exsting post 
Filling in the form happens depending on two situations
if initialValues are filled and delivered, that already means 
post is on editing mode.
if initialValues has no value, that means it is fresh post hence use Default values
*/
function FoodForm({
  onSubmitSuccess,
  initialValues = DEFAULT_VALUES,
  onCancel,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { title, content, calorie, imgUrl } = values;

  const handleChange = (name, value) => {
    setValues((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("calorie", calorie);
    formData.append("imgUrl", imgUrl);
    try {
      setIsSubmitting(true);
      const { food } = await createList(formData);
      setValues(DEFAULT_VALUES);
      onSubmitSuccess(food);
    } catch (error) {
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[138px] w-full rounded-xl p-2 border-2 relative">
      <form
        className="flex w-full items-center gap-3 justify-between p-3"
        onSubmit={handleSubmit}
      >
        <div className="flex w-1/3 lg:w-1/12 justify-center">
          <div className=" h-[87px] w-[90px] sm:w-[100px] relative border-2 rounded-md">
            <FileInput name="imgUrl" value={imgUrl} onChange={handleChange} />
          </div>
        </div>
        <div className="flex w-2/3 lg:w-11/12 flex-col ">
          <div className="flex w-full justify-between pt-1 pb-4 gap-0 sm:gap-3 ">
            <div className="w-5/12">
              <label htmlFor="title"></label>
              <input
                className="p-1 border-2 rounded-md w-full"
                id="title"
                name="title"
                placeholder="e.g. apple"
                type="text"
                value={title}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-2/12  sm:w-5/12 ">
              <label htmlFor="calorie"></label>
              <input
                className="p-1 border-2 rounded-md w-full"
                id="calorie"
                name="calorie"
                type="number"
                value={calorie}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-3/12 flex flex-shrink-0 justify-end ">
              <button
                className={`w-full rounded-md text-white  font-semibold border px-2 py-1 hover:bg-darkgreen ${
                  isSubmitting
                    ? "bg-gray-500 hover:bg-gray-500"
                    : "bg-green hover:bg-darkgreenhover:bg-darkgreen"
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                Post
              </button>
              {onCancel && (
                <button
                  className={`absolute w-8 h-8 top-[-10px] right-[-10px] border-2 bg-white rounded-full text-gray-400 font-bold text-sm px-2 py-1 hover:bg-gray-200 
                    `}
                  type="submit"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  X
                </button>
              )}
            </div>
          </div>
          <div className="">
            <label htmlFor="content"></label>
            <input
              className="p-1.5 border-2 rounded-md w-full"
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
