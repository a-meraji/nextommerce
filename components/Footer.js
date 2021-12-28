function footer() {
  return (
    <footer className="text-primary bg-primary">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center md:text-left text-center -mb-10 -mx-4">
          <div className=" px-4">
            <h2 className="font-medium  tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10 text-secondary opacity-[65%]">
              <li>
                <a className="hover:text-primary">First Link</a>
              </li>
              <li>
                <a className="hover:text-primary">Second Link</a>
              </li>
              <li>
                <a className="hover:text-primary">Third Link</a>
              </li>
              <li>
                <a className="hover:text-primary">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div className=" px-4">
            <h2 className="font-medium  tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10 text-secondary opacity-[65%]">
              <li>
                <a className="hover:text-primary">First Link</a>
              </li>
              <li>
                <a className="hover:text-primary">Second Link</a>
              </li>
              <li>
                <a className="hover:text-primary">Third Link</a>
              </li>
              <li>
                <a className="hover:text-primary">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div className=" px-4">
            <h2 className="font-medium tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10 text-secondary opacity-[65%]">
              <li>
                <a className="hover:text-primary">First Link</a>
              </li>
              <li>
                <a className="hover:text-primary">Second Link</a>
              </li>
              <li>
                <a className="hover:text-primary">Third Link</a>
              </li>
              <li>
                <a className="hover:text-primary">Fourth Link</a>
              </li>
            </nav>
          </div>
          
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container px-5 py-8 flex flex-wrap mx-auto justify-center items-center">
          <div className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
            <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
              <label
                htmlFor="footer-field"
                className="leading-7 pl-3 text-sm text-secondary"
              >
                Send a message
              </label>
              <input
                type="text"
                id="footer-field"
                name="footer-field"
                className="w-full bg-hover opacity-50 rounded-full focus:ring-2 focus:ring-green-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="inline-flex text-[#fff] border-4 border-transparent bg-accent py-1 px-6 focus:outline-none hover:bg-white hover:text-accent hover:border-green-500 rounded-full">
              Send
            </button>
          </div>
          <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
            <a className="text-secondary">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a href="https://twitter.com/mamad_coder" target="_blank" className="ml-3 text-secondary">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-secondary">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
      <div className="bg-secondary bg-opacity-80">
        <div className="container mx-auto py-4 px-5 flex justify-center">
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
      </div>
    </footer>
  );
}

export default footer;
