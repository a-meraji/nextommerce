import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../Contexts/globalContext/context";
import Link from "next/link";
import { useRouter } from "next/router";
export default function login() {
  const { updateAccount } = useGlobalContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (form) => {
    const res = await fetch("/api/auth/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.message == "login successfuly") {
      const { name, lastname, phone, address } = data.account;
      updateAccount({ name, lastname, phone, address, isAdmin:false });
      router.push("/");
    }else{
      alert(data.message)
    }
  };
  return (
    <div className="bg-secondary text-secondary pt-12 pb-20">
      <form
        className="flex flex-col w-4/5 max-w-[500px] border-2 bg-third border-third p-6 sm:px-10 my-10 mx-auto rounded-xl"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label className="mb-1 text-primary text-lg">Email</label>
        <input
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="Email"
          type="email"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email && (
          <p className="text-red-700">
            {errors.email.type == "required"
              ? "please enter your email"
              : "this email seems to be not valid"}
          </p>
        )}
        <label className="mb-1 text-primary text-lg">Password</label>
        <input
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="Password"
          type="password"
          {...register("password", {
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,40}$/,
          })}
        />
        {errors.password && (
          <p className="text-red-700">
            {errors.password.type == "required"
              ? "please enter your password"
              : "password must be between 6 and 40 characters included capital letters and numbers"}
          </p>
        )}
        <button
          className="bg-accent text-gray-200 my-5 mx-auto text-lg rounded-full py-1 px-5 w-[80%]"
          type="submit"
        >
          Login
        </button>
        <div className="text-xs text-center">
          <Link href="/auth/signup">
            <a>don't have an account. sign up</a>
          </Link>
        </div>
      </form>
    </div>
  );
}
