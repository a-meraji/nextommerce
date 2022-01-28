import { useGlobalContext } from "../Contexts/globalContext/context";
import { langs } from "../Contexts/values/LangValues";
import EnAbout from "./lingual/EnAbout";
import FaAbout from "./lingual/FaAbout";

function about() {
  const {lang} = useGlobalContext();

  return(<>
  {lang===langs['en']?<EnAbout/>:<FaAbout/>}
  </>)
}

export default about;
