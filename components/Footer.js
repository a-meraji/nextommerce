import { socialLinks } from "../shared/json";
import Link from "next/link";
import LangSelector from "./LangSelector";
function footer() {
  return (
    <footer className="text-primary bg-primary py-6">
        <div className="flex justify-center sm:justify-end text-center w-full mb-6 sm:mb-3 pr-5 text-xs">
          <LangSelector/>
        </div>
      <ul className="flex justify-center pb-3 px-6 border-b-[1px] border-secondarycont w-min mx-auto">
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
        <div className="container mx-auto pt-3 px-5 flex justify-center">
          <p className="text-secondary text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Nextommerce —
            <a
              href="https://twitter.com/mamad_coder"
              className="text-gray-500 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              @AminMeraji
            </a>
          </p>
      </div>
    </footer>
  );
}

export default footer;
