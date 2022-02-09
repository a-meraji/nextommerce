import Link from "next/link"
import { server } from "../../config";
import { useGlobalContext } from "../../Contexts/globalContext/context";
import {useRouter} from "next/router";
export default function AdminNav() {
    const {setDisplayProf,updateAccount} = useGlobalContext();
    const router = useRouter();
    
    const loggingOut = async () => {
        const result = await fetch(`${server}/api/auth/admin`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await result.json();
        setDisplayProf(false);
        console.log(data);
        if (data.message == "loged out") {
          updateAccount({});
          router.push("/admin/login");
        }
      };
    return(
        <section className="mt-[10px] px-5 bg-secondary border-t-[1px] border-b-[1px] border-hovercont text-primary text-sm">
            <ul className="flex flex-row justify-between">
                <div className="flex flex-row justify-start gap-x-9  py-5">
                <li ><Link href="/admin/product/create"><a>New product</a></Link></li>
                <li ><Link href="/admin/product/hat"><a>display products</a></Link></li>
                <li ><Link href="/admin/order"><a>orders</a></Link></li>
                </div>
                <div className="flex flex-row justify-end py-5">
                    <li onClick={()=>loggingOut()}>Log out</li>
                </div>
            </ul>
        </section>
    )
}