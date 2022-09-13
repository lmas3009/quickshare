import { Auth } from "aws-amplify";
import { BiHomeSmile, BiLogOutCircle } from "react-icons/bi";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between poppins pt-5 pl-2 pr-2 sm:p-5">
      <div>
        <p>QuickShare</p>
      </div>
      <div className="flex gap-3">
        <a href="/home" className="flex items-center gap-1 cursor-pointer">
          <span>
            <BiHomeSmile />
          </span>
          Home
        </a>
        <p
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            Auth.signOut();
          }}
        >
          <span>
            <BiLogOutCircle />
          </span>
          Logout
        </p>
      </div>
    </div>
  );
};

export default Header;
