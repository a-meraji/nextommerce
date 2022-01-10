import { useRouter } from "next/router";
import Link from "next/link";

export default function SideCategories({ categories }) {
  const router = useRouter();
  return (
    <>
    {/* for tablet and pc view port */}
    <div className="hidden relative sm:block w-[15%] pl-3">
      <div className="absolute top-0 right-0">

      <h4 className="text-md capitalize mb-0.5 text-primary">Categories</h4>
      <div className="flex flex-col gap-y-2 mt-3 ml-0.5">
        <Link
          href="/search"
          className={`${
            router.query.cat == undefined ? "underline text-accent" : null
          } text-left cursor-pointer hover:text-primary`}
          >
          <a>all products</a>
        </Link>
        {categories?.map((item, i) => {
          return (
            <Link
            key={i}
            className={`${
              router.query.cat === item ? "underline text-accent" : null
            } cursor-pointer hover:text-primary`}
            href={`/search/${item}`}
            >
              <a>{item}</a>
            </Link>
          );
        })}
      </div>
        </div>
    </div>
    {/* for mobile view port */}
    <div className="absolute top-0 left-0 block sm:hidden mx-5">1</div>
    </>
  );
}
