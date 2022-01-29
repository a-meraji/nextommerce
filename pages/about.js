import { useGlobalContext } from "../Contexts/globalContext/context";
import { langs } from "../Contexts/values/LangValues";
import EnAbout from "../components/linguals/EnAbout";
import FaAbout from "../components/linguals/FaAbout";

function about() {
  const {lang} = useGlobalContext();

  return(<>
  {lang===langs['en']?<EnAbout/>:<FaAbout/>}
  </>)
}

export default about;
