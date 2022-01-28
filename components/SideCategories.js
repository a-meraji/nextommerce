import { useRouter } from "next/router";
import { useGlobalContext } from "../Contexts/globalContext/context";
import Link from "next/link";
import styles from "../shared/styles/flyout_menu.module.css";
import { TemplateIcon } from "@heroicons/react/outline";
import {
  GiWinterHat,
  GiShirt,
  GiSleevelessJacket,
  GiTrousers,
} from "react-icons/gi";
import { MdMasks } from "react-icons/md";
import { FaTshirt } from "react-icons/fa";

export default function SideCategories({ categories }) {
  const { setSort, translate:t } = useGlobalContext();
  const router = useRouter();
  return (
    <>
      {/* for tablet and pc view port */}
      <div className="hidden relative sm:block w-[15%]">
        <div className="absolute top-0 left-0 ml-4 md:ml-10">
          <h4 className="text-xl font-bold capitalize mb-0.5 text-primary">
            {t("Categories")}
          </h4>
          <div className="flex flex-col gap-y-2 mt-3 ml-0.5">
            <div onClick={() => setSort("relevence")}>
              <Link onClick={() => setSort("relevence")} href="/search">
                <a
                  className={`${
                    router.query.cat === undefined
                      ? "underline text-accent"
                      : "text-third"
                  } cursor-pointer hover:text-primary`}
                >
                  {t("all_products")}
                </a>
              </Link>
            </div>
            {categories?.map((item, i) => {
              return (
                <Link key={i} href={`/search/${item}`}>
                  <a
                    className={`${
                      router.query.cat === item
                        ? "underline text-accent"
                        : "text-third"
                    } cursor-pointer hover:text-primary`}
                  >
                    {t(item)}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* for mobile view port */}
      <div className="sm:hidden absolute top-0 mt-14 left-0 right-0 text-center">
        <div
          onClick={() => setSort("relevence")}
          className="w-max text-sm px-4 py-2 mx-auto bg-forth text-forth rounded-full z-10"
        >
          <Link href="/search" className={`cursor-pointer hover:text-primary`}>
            <a>All Products</a>
          </Link>
        </div>
      </div>

      <div className="absolute top-20 left-0  block sm:hidden mx-6">
        <aside className="menu relative">
          <label htmlFor="mune-toggler" className={styles.menuLabel}>
            <TemplateIcon width={25} height={25} />
          </label>
          <input
            type="checkbox"
            id="menu-toggler"
            className={styles.menuToggler}
            onClick={(e) => e.target.checked}
          />
          <ul>
            {categories?.map((item, i) => {
              return (
                <li className={styles.menuItem} key={i}>
                  <Link href={`/search/${item}`}>
                    <a
                      className={`${
                        router.query.cat === item
                          ? "underline text-accent"
                          : null
                      } text-lg`}
                    >
                      {iconer(item)}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </>
  );
}

function iconer(cat) {
  switch (cat) {
    case "hat":
      return <GiWinterHat />;
    case "t-shirt":
      return <FaTshirt />;
    case "shirt":
      return <GiShirt />;
    case "jacket":
      return <GiSleevelessJacket />;
    case "pants":
      return <GiTrousers />;
    case "accessory":
      return <MdMasks />;
    default:
      return null;
  }
}
