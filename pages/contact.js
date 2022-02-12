import {FaTelegram} from "react-icons/fa";
import {FiAtSign} from "react-icons/fi";

function contact() {
    return (
        <div className="bg-secondary text-secondary py-14 px-5">
            <h2 className="text-primary text-lg font-bold">Contacts:</h2>
            <ul>
                <li><a href="https://t.me/amin_mrj"><FaTelegram/> t.me/amin_mrj</a></li>
                <li><FiAtSign/> email: merajiamin1997@gmail.com</li>
            </ul>
        </div>
    )
}

export default contact
