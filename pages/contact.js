import { FaTelegram } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";

function contact() {
  return (
    <div className="bg-secondary text-secondary absolute top-[25%]  right-0 left-0 flex justify-center">
      <div>
        <h2 className="text-primary text-xl font-bold mb-6">Contacts:</h2>
        <ul className="text-lg">
          <li className="my-5">
            <a href="https://t.me/amin_mrj" className="text-accent flex gap-3">
              <FaTelegram className="mt-1" /> <span>t.me/amin_mrj</span>
            </a>
          </li>
          <li className="text-accent flex gap-4 my-5">
            <FiAtSign className="mt-1" /> <span>merajiamin1997@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default contact;
