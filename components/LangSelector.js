import { useGlobalContext } from "../Contexts/globalContext/context";
import ReactCountryFlag from "react-country-flag";
import { langs } from "../Contexts/values/LangValues";
export default function LangSelector() {
const {translate:t,lang, langChanger} = useGlobalContext();
    return (
    <div className="flex flex-row"
    style={{
        direction: lang === langs["fa"] ? "rtl" : "ltr",
      }}>
      <p>{t("language")}</p>
      <button onClick={() => langChanger(langs["en"])} className="mx-2">
        <ReactCountryFlag
          countryCode="GB"
          style={{
            objectFit: "cover",
            width: "25px",
            height: "25px",
            borderRadius: "50%",
          }}
          svg
        />
      </button>
      <button onClick={() => langChanger(langs["fa"])} className="mx-2">
        <ReactCountryFlag
          countryCode="IR"
          style={{
            objectFit: "cover",
            width: "25px",
            height: "25px",
            borderRadius: "50%",
          }}
          svg
        />
      </button>
    </div>
  );
}
