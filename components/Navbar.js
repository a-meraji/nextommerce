import { SearchIcon, MenuIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { navToggler } from "../utils/themeClass";
import { connect } from "react-redux";
import { toggleTheme } from "../redux/actions/themeActions";
import BtnThemeToggle from "./BtnThemeToggle";

function Navbar({ isDark, toggleTheme }) {
  return (
    <nav
      style={navToggler(isDark)}
      className="flex justify-between items-center px-3 py-5 bg-transparent"
    >
      <div className="flex">
        <button>
          <MenuIcon className="w-5 h-5" />
        </button>
        <div className="flex">
          <div className="ml-6">
            <Link href="/">Home</Link>
          </div>
          <div className="ml-6">
            <Link href="/">Categories</Link>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="bg-gray-500 rounded-full py-3 px-6">search</div>
      </div>
      <div className="flex">
        <button><BtnThemeToggle toggleTheme={toggleTheme} isDark={isDark}/></button>
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
