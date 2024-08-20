import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="sticky top-0 w-full z-20">
      <div className="flex bg-grey justify-center border-b-2">
        <img className="h-14 m-2" src={logo} alt="logo" />
      </div>
    </div>
  );
}
export default Header;
