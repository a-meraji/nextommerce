import { useGlobalContext } from "../Contexts/globalContext/context";
import Link from "next/link";
import { sideList, socialLinks } from "../shared/json";
import { XIcon } from "@heroicons/react/outline";
function Sidebar() {
  const { showSide, sideToggler } = useGlobalContext();

  return (
    <aside
      className={`z-50 glob-trans py-8 px-6 fixed top-0 left-0 w-full sm:w-[325px] h-full bg-primary text-secondary grid grid-rows${
        showSide
          ? "translate-y-0 translate-x-0"
          : "-translate-y-full -translate-x-full"
      }`}
      style={{ gridTemplateRows: "auto 1fr auto", rowGap: "1rem" }}
    >
      {/* side bar header */}
      <div className=" flex justify-between items-center">
        <h3>Site Logo</h3>
        <button onClick={sideToggler}>
          <XIcon width="25px" className=" text-primary hover:text-accent" />
        </button>
      </div>
      {/* side bar list */}
      <ul className=" mt-4">
        {sideList.map((item, i) => (
          <li
            className="flex pl-4 py-3 rounded-full w-1/2 hover:w-full hover:text-primary hover:bg-third glob-trans hover:ml-4"
            key={i}
            onClick={sideToggler}
          >
            <item.icon width="20px" />
            <Link href={item.url} className="ml-3 text-md">
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      {/* social links */}
      <ul className="flex justify-center">
        {socialLinks.map((item, i) => (
          <li
            className="mx-3 p-1 -mb-1 glob-trans hover:scale-150 hover:text-primary rounded-full hover:bg-third"
            key={i}
          >
            <Link href={item.url}>
              <a target="_blank">
                <item.icon />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
/*

*/
export default Sidebar;
