import { sortView } from "../shared/json";
import { useRouter } from "next/router";
import { useGlobalContext } from "../Contexts/globalContext/context";
function SortItems() {
  const router = useRouter();
  const { sort, setSort } = useGlobalContext();
  return (
    <div className="hidden relative sm:block w-[15%] pr-3">
      <div className="top-0 left-0">
        <h4 className="text-md capitalize mb-0.5 text-primary">Sort By</h4>
        <div className="flex flex-col gap-y-2 mt-3 ml-0.5">
          {sortView.map((item, i) => (
            <button
              key={i}
              className={`text-left hover:text-primary capitalize ${
                sort === item.sort ? "text-accent underline" : ""
              }`}
              onClick={() => setSort(item.sort)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SortItems;
