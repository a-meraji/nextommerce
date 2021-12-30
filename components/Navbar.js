import {
  SearchIcon,
  MenuIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useGlobalContext } from "../Contexts/globalContext/context";
import Toggle from "./ThemeToggle";
import { useRouter } from "next/router";
import { useState } from "react";
import { server } from "../config";

function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.q ? router.query.q : "");
  const { sideToggler } = useGlobalContext();
  return (
    <>
      <nav className="z-40 sticky top-0 flex justify-between text-sm items-center px-3 py-5 bg-transparent text-secondary glob-trans">
        <div className="flex ">
          <button onClick={sideToggler}>
            <MenuIcon className="cursor-pointer w-[22px] h-[22px] hover:text-primary" />
          </button>
          <div className="hidden sm:flex">
            <div className="ml-6 hover:text-primary">
              <Link href="/">
                <a>Home</a>
              </Link>
            </div>
            <div className="ml-6 hover:text-primary">
              <Link href="/search">
                <a>Categories</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between max-w-min bg-third hover:bg-hover hover:text-primary py-1 px-2 rounded-full ">
          <div className="form-control min-w-[150px] sm:min-w-[200px] md:min-w-[250px] ">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  let currentUrlParams = new URLSearchParams(
                    router.query
                    );
                    currentUrlParams.set("q", search);
                    router.push(server + "/search?" + currentUrlParams.toString());
                }
              }}
              type="text"
              placeholder="Search"
              className="mt-[1px] w-full ml-1 bg-transparent text-primary placeholder-[#757474] focus:outline-none"
            />
          </div>
          <SearchIcon className="w-5 h-5 mr-1" />
        </div>
        <div className="flex">
          <div className="mr-3 sm:mr-6 mt-1">
            <Toggle />
          </div>
          <div className="mr-3 sm:mr-6 mt-1 hover:text-primary">
            <button>
              <ShoppingBagIcon className="w-[22px] h-[22px]" />
            </button>
          </div>
          <div>
            <button>
              {/* <img
              className="w-7 h-7 rounded-full"
              src="https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
            ></img> */}
              <UserCircleIcon className="w-[24px] h-[24px] mt-1" />
            </button>
          </div>
        </div>
      </nav>
      <div className="absolute w-full py-10 top-0 bg-secondary glob-trans"></div>
    </>
  );
}
export default Navbar;
