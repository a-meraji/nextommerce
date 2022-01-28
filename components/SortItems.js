import { sortView } from "../shared/json";
import { useGlobalContext } from "../Contexts/globalContext/context";
import styles from "../shared/styles/side_clyout.module.css";
import { useState } from "react";
import { FilterIcon } from "@heroicons/react/outline";
import { langs } from "../Contexts/values/LangValues";

function SortItems() {
  const [showUl, setShowUl] = useState(false);
  const { sort, setSort, theme, translate: t, lang } = useGlobalContext();
  return (
    <>
      <div className={`hidden relative sm:block w-[15%]`}>
        <div className="top-0 left-0">
          <h4 className="text-xl font-bold capitalize mb-0.5 text-primary">
            {t("sort")}
          </h4>
          <div className="flex flex-col gap-y-2 mt-3 ml-0.5 text-third">
            {sortView.map((item, i) => (
              <button
                key={i}
                className={`text-left hover:text-primary capitalize ${
                  sort === item.sort ? "text-accent underline" : null
                }`}
                onClick={() => setSort(item.sort)}
              >
                {t(item.sort)}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* mobile viewport */}

      <aside className="absolute top-0 right-0  block sm:hidden mr-7">
        <div className="flex flex-row">
          <div className="relative">
            <label
              htmlFor="sort-toggler"
              className={`${styles.menuLabel} top-[3.7rem] right-0`}
            >
              <FilterIcon width={25} height={25} />
            </label>
            <input
              type="checkbox"
              id="sort-toggler"
              className={`${styles.menuToggler} 
              top-[3.7rem] right-0`}
              onClick={() => setShowUl(!showUl)}
            />
          </div>
          <ul
            className={`menuSort ${
              showUl ? "opacity-100 block" : "opacity-0 hidden"
            } 
            ${lang === langs["fa"] ? "text-right" : "text-left"}
            transition-opacity absolute top-2 right-9 border-[1px] border-primarycont rounded-lg p-4 bg-secondarycont text-secondarycont`}
          >
            {sortView.map((item, i) => (
              <li key={i} className="min-w-[150px]">
                <button
                  className={`py-1 text-left hover:text-primary capitalize ${
                    sort === item.sort ? "text-accent underline" : ""
                  }`}
                  onClick={() => {
                    setShowUl(false);
                    setSort(item.sort);
                  }}
                >
                  {t(item.sort)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <style jsx>{`
          .menuSort::before {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid ${theme === "dark" ? "#eee" : "#151515"};
            position: absolute;
            top: 54px;
            right: -1px;
            z-index: 5;
            transform: rotate(90deg) translateY(-12px);
          }
        `}</style>
      </aside>
    </>
  );
}

export default SortItems;
