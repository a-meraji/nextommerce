import { useGlobalContext } from "../Contexts/Context";
import {XIcon} from "@heroicons/react/outline"
function Sidebar() {
  const { showSide, sideToggler } = useGlobalContext();
  return (
    <aside
      className={`fixed top-0 left-0 w-full sm:w-[325px] h-full bg-primary grid grid-rows px-6 glob-trans${
        showSide
          ? "translate-x-0 translate-y-0"
          : "-translate-x-full -translate-y-full"
      }`}
      style={{gridTemplateRows:'auto 1fr auto',rowGap: '1rem'}}
    >
        {/* side bar header */}
        <div className="flex justify-between items-center py-4">
            <h3>Site Logo</h3>
            <button onClick={sideToggler}>
                <XIcon width='25px'/>
            </button>
        </div>
        {/* side bar list */}
        <ul></ul>
    </aside>
  );
}
/*

*/
export default Sidebar;
