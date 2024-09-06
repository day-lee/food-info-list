import { useEffect, useRef, useState } from "react";

import cancel from "../assets/cancel.svg";
import previewUpload from "../assets/image-upload.svg";

function FileInput({ name, value, onChange, initialPreview }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    onChange(name, e.target.files[0]);
  };
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    onChange(name, null);
  };

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (!value) return;
    const previewUrl = URL.createObjectURL(value);
    setPreview(previewUrl);
    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(previewUrl);
    };
  }, [value, initialPreview]);

  return (
    <>
      <div className="absolute top-[-5px] right-[-5px] w-8  z-10">
        {value && (
          <button type="button" onClick={handleClearClick}>
            <img src={cancel} alt="X" />
          </button>
        )}
      </div>

      <div className="absolute w-18 inset-3">
        <img
          className="w-[70px] h-[60px] hover:cursor-pointer"
          src={preview || previewUpload}
          alt="preview upload"
          onClick={handleUploadClick}
        />
        <input
          hidden
          className=" w-[70px] h-[60px]"
          id={name}
          name={name}
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
    </>
  );
}
export default FileInput;
