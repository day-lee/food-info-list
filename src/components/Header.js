import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="sticky w-full h-20 w-20 top-0 z-20">
      <div className="flex bg-grey justify-center border-b-2">
        <img className="h-14 m-2" src={logo} alt="logo" />
      </div>
    </div>
  );
}
export default Header;
