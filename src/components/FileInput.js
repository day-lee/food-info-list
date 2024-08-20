import { useState, useRef, useEffect } from "react";
import previewUpload from "../assets/image-upload.svg";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState("");
  const inputRef = useRef();

  const handleChange = (e) => {
    onChange(name, e.target.files[0]);
  };
  const handleClearClick = () => {
    // DOM node manipulation using .curretn property
    // use condition in case there is no value
    // make sure to connect with html input using 'ref'
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    onChange(name, null);
  };

  const handleUploadClick = () => {
    // Trigger the hidden file input
    inputRef.current.click();
  };

  useEffect(() => {
    if (!value) return;
    // create blob, temporary address for img
    const previewUrl = URL.createObjectURL(value);
    setPreview(previewUrl);
    // cleanup
    return () => {
      setPreview();
      //clean the unused memory
      URL.revokeObjectURL(previewUrl);
    };
  }, [value]);

  // uncontrolled component for file input (security reasons)
  return (
    <div>
      <img
        className="hover:cursor-pointer"
        src={preview || previewUpload}
        alt="preview upload"
        onClick={handleUploadClick}
      />
      <input
        className="hidden"
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button type="button" onClick={handleClearClick}>
          X
        </button>
      )}
    </div>
  );
}
export default FileInput;
