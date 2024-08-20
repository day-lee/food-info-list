import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="flex bg-grey justify-center border-b-2">
      <img className="h-14 m-2" src={logo} alt="logo" />
    </div>
  );
}
export default Header;
