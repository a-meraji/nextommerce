import { server } from "../config";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../Contexts/globalContext/context";
import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Profile() {
  const router = useRouter();
  const { updateAccount, account, displayProf, setDisplayProf } =
    useGlobalContext();
  useEffect(async () => {
    const result = await fetch(
      `${server}/api/account`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      [account]
    );
    const data = await result.json();
    if (data.message === "Account found") {
      const { name, lastname, address, phone, isAdmin } = data.account;
      const newAcc = isAdmin
        ? { name, lastname, isAdmin }
        : { name, lastname, address, phone, isAdmin };
      updateAccount(newAcc);
    }
  }, []);
  const logOut = async () => {
    const redirect = account.isAdmin ? "/admin/login" : "/auth/login";
    const result = await fetch(
      `${server}/api/auth/${account.isAdmin ? "admin" : "users"}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await result.json();
    setDisplayProf(false);
    if (data.message == "loged out") {
      updateAccount({});
      router.push(redirect);
    }
  };
  return (
    <div
      className={`${
        displayProf ? "block" : "hidden"
      } fixed top-0 right-0 mt-20 mr-[10px] z-50`}
    >
      <div className="absolute top-0 left-0 m-2 text-secondarycont">
        <button onClick={() => setDisplayProf(false)}>
          <XIcon width={20} />
        </button>
      </div>
      <div className="bg-secondarycont text-secondarycont rounded-xl w-[200px] h-[150px] flex justify-center">
        {account.name ? (
          <div className="text-center mt-4">
            <p>
              <span className="text-primarycont text-lg">name : </span>{" "}
              {account.name}
            </p>
            <p>
              <span className="text-primarycont text-lg">last name : </span>{" "}
              {account.lastname}
            </p>
            <button
              className="bg-secondary rounded-full mt-3 px-4 py-2 text-secondary"
              onClick={async () => logOut()}
            >
              log out
            </button>
          </div>
        ) : (
          <div className="my-14">
            <div className="bg-secondary rounded-full px-6 pt-1 h-8 text-secondary">
              <button onClick={() => setDisplayProf(false)}>
                <Link href="/auth/login">
                  <a>log in</a>
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
