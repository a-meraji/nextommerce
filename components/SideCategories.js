import { useRouter } from "next/router";
import { server } from "../config";

export default function SideCategories({ categories }) {
  const router = useRouter();
  return (
    <div className="hidden sm:block w-[17%] pl-3">
      <h4 className="text-md capitalize mb-0.5 text-primary">Categories</h4>
      <div className="flex flex-col gap-y-2 mt-3 ml-0.5">
          <button
            className={`${
              router.query.cat == undefined ? "underline text-accent" : null
            } text-left cursor-pointer hover:text-primary`}
            onClick={() => {
              let params = new URLSearchParams(router.query);
              params.set("q", "");
              params.delete("cat");
              router.push(server + "/search" + "?" + params.toString());
            }}
          >
            all products
          </button>;
        {categories?.map((item, i) => {
          return (
            <button
              key={i}
              className={`${
                router.query.cat === item ? "underline text-accent" : null
              } text-left cursor-pointer hover:text-primary`}
              onClick={() => {
                let params = new URLSearchParams(router.query);
                params.delete("q");
                params.delete("cat");
                router.push(server + "/search/" + item + "?" + params.toString());
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
