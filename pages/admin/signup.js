import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../Contexts/globalContext/context";
import { useRouter } from "next/router";
export default function signup() {
  const  router  = useRouter();
  const { updateAccount } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (form) => {
    const res = await fetch("/api/auth/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.account) {
      const { name, lastname } = data.account;
      updateAccount({ name, lastname, isAdmin:true });
      router.push("/admin/order");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="bg-secondary text-secondary py-10">
      <form
        className="w-4/5 max-w-[500px] border-2 bg-third border-third p-6 sm:px-10 mx-auto rounded-xl flex flex-col"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label className="mb-1 text-primary text-lg" htmlFor="name">
          First Name:
        </label>
        <input
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter your First Name"
          id="name"
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
        />
        {errors.name && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.name.type == "required"
              ? "* please enter your firstname"
              : "* maximum lenght for first name is 20 character"}
          </p>
        )}
        <label className="mb-1 text-primary text-lg" htmlFor="lastname">
          Last Name:
        </label>
        <input
          id="lastname"
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter your Last Name"
          type="text"
          {...register("lastname", { required: true, maxLength: 20 })}
        />
        {errors.lastname && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.lastname.type == "required"
              ? "* please enter your last name"
              : "* maximum lenght for last name is 20 character"}
          </p>
        )}
        <label className="mb-1 text-primary text-lg" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter your Email"
          type="email"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.email.type == "required"
              ? "* please enter your email"
              : "* invalid Email"}
          </p>
        )}
        <label className="mb-1 text-primary text-lg" htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter a Password"
          type="password"
          {...register("password", {
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,40}$/,
          })}
        />
        {errors.password && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.password.type == "required"
              ? "* please enter a password"
              : "* password must be between 6 and 40 characters included capital letters and numbers"}
          </p>
        )}

        <p className="text-primary text-lg">choose a role:</p>
        <div className="flex">
          <input
            id="admin"
            name="role"
            value="admin"
            type="radio"
            {...register("role", {
              required: true,
            })}
          />
          <label className="ml-1 pb-2" htmlFor="admin">
            admin
          </label>
        </div>
        <div className="flex mb-7">
          <input
            id="master"
            name="role"
            value="master"
            type="radio"
            {...register("role", {
              required: true,
            })}
          />
          <label className="ml-1 pb-2" htmlFor="master">
            master
          </label>
        </div>
        <br />
        <div className="flex">
          <input
            id="root"
            name="root"
            value={() => EventTarget.value}
            type="checkbox"
            {...register("root")}
          />
          <label className="text-primary text-lg ml-1 pb-2" htmlFor="master">
            root access
          </label>
          <br />
        </div>

        <label className="mb-1 text-primary text-lg" htmlFor="adminEmail">
          adminEmail:
        </label>
        <input
          id="adminEmail"
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter the Email of an already signed admin"
          type="email"
          {...register("adminEmail", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.adminEmail && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.adminEmail.type == "required"
              ? "* please enter admin Email"
              : "* invalid Email"}
          </p>
        )}
        <label className="mb-1 text-primary text-lg" htmlFor="adminPassword">
          admin Password:
        </label>
        <input
          id="enter the password of an already signed admin"
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter admin Password"
          type="password"
          {...register("adminPassword", {
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,40}$/,
          })}
        />
        {errors.adminPassword && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.adminPassword.type == "required"
              ? "* please enter admin Password"
              : "* password must be between 6 and 40 characters included capital letters and numbers"}
          </p>
        )}

        <button
          type="submit"
          className="bg-accent text-gray-200 my-5 text-lg rounded-full py-3 px-5"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
