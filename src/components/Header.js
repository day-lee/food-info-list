import logo from "../assets/logo.png";
import ThemeSelect from "./ThemeSelect";

function Header({ onChange }) {
  return (
    <div className="sticky w-full h-19 top-0 z-20">
      <div className="flex relative bg-grey justify-center border-b-2">
        <div className="flex justify-center">
          <img className="h-14 m-2" src={logo} alt="logo" />
        </div>
      </div>
      <div className="flex absolute right-5 top-6 justify-end">
        <ThemeSelect onChange={onChange} />
      </div>
    </div>
  );
}
export default Header;
