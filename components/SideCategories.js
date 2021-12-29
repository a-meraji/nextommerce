import { useRouter } from "next/router";
import { server } from "../config";
export default function SideCategories({ categories }) {
  const router = useRouter();
  return (
    <div className="hidden sm:block w-[17%] pl-3">
      <h4 className="text-md capitalize mb-0.5 text-primary">Categories</h4>
      <ul className="flex flex-col gap-y-2 mt-3 ml-0.5">
          <li
            className={`${
              router.query.cat == undefined ? "underline text-accent" : null
            } cursor-pointer hover:text-primary`}
            onClick={() => {
              let params = new URLSearchParams(window.location.search);
              params.delete("q");
              router.push(server + "/search?" + params.toString());
            }}
          >
            all products
          </li>;
        {categories?.map((item, i) => {
          return (
            <li
              key={i}
              className={`${
                router.query.cat === item ? "underline text-accent" : null
              } cursor-pointer hover:text-primary`}
              onClick={() => {
                let params = new URLSearchParams(window.location.search);
                params.delete("q");
                router.push(server + "/search/" + item + "?" + params.toString());
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
