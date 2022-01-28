import Link from "next/link";
import { FaGithub, FaCode, FaPhone } from "react-icons/fa";

export default function EnAbout () {
    return(
        <article className="bg-secondary text-secondary py-10 px-5">
        <h4 className="text-primary text-2xl text-center mb-4">
          A Completed E-commerce web application build with NEXT.js.
        </h4>
        <div className="flex flex-col lg:w-[60%] mx-auto justify-center">
          <section className="my-8 w-3/4 mx-auto border-t-[1px] border-b-[1px] border-secondarycont py-3">
            <p className="text-primary text-xl mb-2">Web features: </p>
            <ul className="leading-8 ml-3">
              <li>PWA</li>
              <li>
                Admin Pannel with ability to CRUD products, orders and other admin
                user
              </li>
              <li>JWT authentication service</li>
              <li>Dark and light theme</li>
              <li>Bilingual (English / فارسی)</li>
              <li>Image and font optimized</li>
              <li>Responsive design</li>
            </ul>
          </section>
          <section className="mb-8 w-3/4 mx-auto text-sm text-primary leading-7">
            <p className="flex">
              <a
                href="https://github.com/a-meraji/nextommerce"
                target={"_blank"}
                className="flex"
              >
                <FaGithub className="mt-1.5" width={20} />
                <span className="text-accent mx-1.5">source code</span>
              </a>{" "}
              <span>on Github</span>
            </p>
            <p className="flex">
              <FaCode className="mt-1.5" width={20} />{" "}
              <span className="ml-1.5"> Programmed by Amin Meraji</span>
            </p>
            <Link href="/contact">
              <a className="flex">
                <FaPhone className="mt-1.5" width={20} />{" "}
                <span className="ml-1.5"> Cantact me</span>
              </a>
            </Link>
            <p className="text-third text-sm">ALL images obtained from Vercel demo store site.</p>
          </section>
        </div>
      </article>
    )
}