import { useGlobalContext } from "../Contexts/globalContext/context";
import Link from "next/link";
import { sideList, socialLinks } from "../shared/json";
import { XIcon } from "@heroicons/react/outline";
import { langs } from "../Contexts/values/LangValues";
import LangSelector from "./LangSelector";

function Sidebar() {
  const {
    showSide,
    sideToggler,
    translate: t,
    lang,
  } = useGlobalContext();

  return (
    <aside
      style={{
        direction: lang === langs["fa"] ? "rtl" : "ltr",
        gridTemplateRows: "auto 1fr auto",
        rowGap: "1rem",
      }}
      className={`z-50 py-8 px-6 fixed top-0 w-full sm:w-[325px] h-full bg-primary text-secondary grid grid-rows sidebar
      ${lang === langs["fa"] ? "text-right right-0" : "text-left left-0"} ${
        showSide
          ? `translate-y-0 translate-x-0 ${
              lang === langs["fa"] ? "sidebar-left" : "sidebar-right"
            } `
          : `-translate-y-full ${
              lang === langs["fa"]
                ? "translate-x-full sidebar-left-reverse"
                : "-translate-x-full sidebar-right-reverse"
            }`
      }`}
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
            className="flex px-4 py-3 rounded-full w-1/2 hover:w-full hover:text-primary hover:bg-hover glob-trans hover:mx-4"
            key={i}
            onClick={sideToggler}
          >
            <item.icon width="20px" />
            <Link href={item.url} className="mx-3 text-md">
              <a>{t(item.name)}</a>
            </Link>
          </li>
        ))}
        <li className="px-6 mt-6 pt-3 py-3 border-t-[1px] border-hovercont w-full">
          <LangSelector />
        </li>
      </ul>
      {/* social links */}
      <ul className="flex justify-center">
        {socialLinks.map((item, i) => (
          <li
            className="mx-3 p-1 -mb-1 glob-trans hover:scale-150 hover:text-primary rounded-full hover:bg-hover"
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
