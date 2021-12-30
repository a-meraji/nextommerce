import { sortView } from "../shared/json";
import { useRouter } from "next/router";
import { useGlobalContext } from "../Contexts/globalContext/context";

function SortItems() {
  const router = useRouter();
  const { sort, setSort } = useGlobalContext();
  return (
    <div className="hidden sm:block w-[17%] pr-3">
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
  );
}

export default SortItems;
