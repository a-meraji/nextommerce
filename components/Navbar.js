import { SearchIcon, MenuIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { navToggler } from "../utils/themeClass";
import { connect } from "react-redux";
import { toggleTheme } from "../redux/actions/themeActions";
import BtnThemeToggle from "./BtnThemeToggle";

function Navbar({ isDark, toggleTheme }) {
  return (
    <nav
      style={navToggler(isDark)}
      className="flex justify-between text-sm items-center px-3 py-5 bg-transparent"
    >
      <div className="flex">
        <div className="flex">
          <div className="ml-3">
            <Link href="/">Home</Link>
          </div>
          <div className="ml-6">
            <Link href="/products/all">Categories</Link>
          </div>
        </div>
      </div>
      <div className="flex bg-gray-300 bg-opacity-25 py-1 px-2 rounded-full">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="mt-[1px] ml-1 bg-transparent focus:outline-none   input input-ghost"
          />
        </div>
        <SearchIcon className="w-5 h-5 mr-1" />
      </div>
      <div className="flex">
        <div className="mr-6">
          <BtnThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
        </div>
        <div className="mr-6">
          <button>
            <ShoppingBagIcon className="w-7 h-7"/>
          </button>
        </div>
        <div className="mr-3">
          <button>
            <img
              className="w-7 h-7 rounded-full"
              src="https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
            ></img>
          </button>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return { ...state.themeReducer };
};
const mapDispatchToProps = {
  toggleTheme,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
