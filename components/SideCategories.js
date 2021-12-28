import { useRouter } from "next/router";

export default function SideCategories({ categories }) {
  const router = useRouter();
  return (
    <ul className="flex flex-col gap-y-2 mt-3 ml-0.5">
      {categories?.map((item, i) => {
        return (
          <li
            key={i}
            className={`${
              router.query.cat === item ? "underline text-accent" : null
            } cursor-pointer hover:text-primary`}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
