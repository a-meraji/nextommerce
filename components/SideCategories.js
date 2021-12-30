import { useRouter } from "next/router";
import Link from "next/link";

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
        >
          <Link href="/search">
            <a>all products</a>
          </Link>
        </button>
        {categories?.map((item, i) => {
          return (
            <Link
              key={i}
              className={`${
                router.query.cat === item ? "underline text-accent" : null
              } text-left cursor-pointer hover:text-primary`}
              href={`/search/${item}`}
            >
              <a>{item}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
